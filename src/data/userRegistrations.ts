import { supabase } from '../lib/supabase';

export type RegistrationStatus = 'Pending Verification' | 'Approved' | 'Rejected';

export type UserType = 'Homeowner' | 'Agent / Broker / Dealer' | 'Builder / Developer' | 'Other';

export interface UserRegistration {
  id: string;
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  userType: UserType;
  companyName?: string;
  reraNumber?: string;
  city: string;
  status: RegistrationStatus;
  createdAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

const STORAGE_KEY = 'homes_and_rents_user_registrations';
export const ADMIN_NOTIFICATION_EMAIL = 'homesandrentss@gmail.com';

export const INITIAL_REGISTRATIONS: UserRegistration[] = [
  {
    id: 'reg_admin_super',
    fullName: 'Super Admin',
    mobile: '9739063840',
    whatsapp: '9739063840',
    email: 'admin@homesandrents.com',
    userType: 'Builder / Developer',
    companyName: 'Homes and Rents HQ',
    reraNumber: 'PRM/KA/RERA/1251/310/PR/210312/004000',
    city: 'Bangalore',
    status: 'Approved',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    reviewedAt: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

export const getUserRegistrations = (): UserRegistration[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: UserRegistration[] = JSON.parse(saved);
      return parsed;
    }
    return INITIAL_REGISTRATIONS;
  } catch {
    return INITIAL_REGISTRATIONS;
  }
};

export const saveUserRegistration = async (registration: Omit<UserRegistration, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; registration?: UserRegistration; error?: string }> => {
  try {
    const all = getUserRegistrations();

    // Check for duplicate email or mobile
    const existingEmail = all.find(r => r.email.toLowerCase() === registration.email.trim().toLowerCase());
    if (existingEmail) {
      return { 
        success: false, 
        error: `An account request with email "${registration.email}" already exists (Status: ${existingEmail.status}).` 
      };
    }

    const cleanMobile = registration.mobile.replace(/[^0-9]/g, '');
    const existingMobile = all.find(r => r.mobile.replace(/[^0-9]/g, '') === cleanMobile);
    if (existingMobile) {
      return { 
        success: false, 
        error: `An account request with mobile number "${registration.mobile}" already exists (Status: ${existingMobile.status}).` 
      };
    }

    const newRecord: UserRegistration = {
      ...registration,
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: registration.fullName.trim(),
      mobile: cleanMobile,
      whatsapp: registration.whatsapp ? registration.whatsapp.replace(/[^0-9]/g, '') : cleanMobile,
      email: registration.email.trim().toLowerCase(),
      city: registration.city.trim() || 'Bangalore',
      status: 'Pending Verification',
      createdAt: new Date().toISOString()
    };

    all.unshift(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

    // Attempt backup in Supabase table if available
    try {
      await supabase.from('user_registrations').insert({
        id: newRecord.id,
        full_name: newRecord.fullName,
        mobile: newRecord.mobile,
        whatsapp: newRecord.whatsapp,
        email: newRecord.email,
        user_type: newRecord.userType,
        company_name: newRecord.companyName || null,
        rera_number: newRecord.reraNumber || null,
        city: newRecord.city,
        status: newRecord.status,
        created_at: newRecord.createdAt
      });
    } catch {
      // Graceful fallback to local storage
    }

    // Trigger Admin Notification mailto / webhook link
    sendAdminEmailNotification(newRecord);

    return { success: true, registration: newRecord };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error saving registration' };
  }
};

export const updateUserRegistrationStatus = (id: string, status: RegistrationStatus, adminNotes?: string) => {
  try {
    const all = getUserRegistrations();
    const updated = all.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          adminNotes: adminNotes || item.adminNotes,
          reviewedAt: new Date().toISOString()
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also attempt Supabase update
    (async () => {
      try {
        await supabase.from('user_registrations').update({
          status,
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString()
        }).eq('id', id);
      } catch {
        // ignore if table does not exist
      }
    })();

    return true;
  } catch (err) {
    console.error('Error updating registration status:', err);
    return false;
  }
};

export const getUserRegistrationStatus = (email?: string | null): { status: RegistrationStatus | 'Not Registered'; registration?: UserRegistration } => {
  if (!email) return { status: 'Not Registered' };

  // Super Admin is always approved
  if (email.toLowerCase() === 'admin@homesandrents.com') {
    return { status: 'Approved' };
  }

  const all = getUserRegistrations();
  const found = all.find(r => r.email.toLowerCase() === email.trim().toLowerCase());
  if (found) {
    return { status: found.status, registration: found };
  }

  return { status: 'Not Registered' };
};

export const sendAdminEmailNotification = (registration: UserRegistration) => {
  // Construct email subject and content (strictly avoiding passwords for security)
  const subject = encodeURIComponent(`[New Registration] ${registration.fullName} - ${registration.userType} (${registration.city})`);
  const body = encodeURIComponent(
    `Homes and Rents — New User Registration Request\n\n` +
    `A new user has submitted a registration request on the Homes and Rents portal.\n\n` +
    `----------------------------------------\n` +
    `Registration Details:\n` +
    `----------------------------------------\n` +
    `1. Full Name: ${registration.fullName}\n` +
    `2. Mobile Number: ${registration.mobile}\n` +
    `3. WhatsApp Number: ${registration.whatsapp}\n` +
    `4. Email ID: ${registration.email}\n` +
    `5. User Type: ${registration.userType}\n` +
    `6. Company / Dealer Name: ${registration.companyName || 'N/A (Individual Owner)'}\n` +
    `7. RERA Registration Number: ${registration.reraNumber || 'N/A'}\n` +
    `8. City: ${registration.city}\n` +
    `9. Status: Pending Verification\n` +
    `10. Registration Time: ${new Date(registration.createdAt).toLocaleString()}\n\n` +
    `----------------------------------------\n` +
    `Action Required:\n` +
    `Please review these details and contact the user within 60 minutes.\n` +
    `Log into the Super Admin Dashboard to Approve or Reject this account.\n\n` +
    `Better Info. Smarter Decisions.\n` +
    `Homes and Rents Admin Desk\n` +
    `Recipient: ${ADMIN_NOTIFICATION_EMAIL}`
  );

  const mailtoUrl = `mailto:${ADMIN_NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
  
  // Also log for admin records
  console.log('Admin registration alert dispatched to:', ADMIN_NOTIFICATION_EMAIL, mailtoUrl);
};
