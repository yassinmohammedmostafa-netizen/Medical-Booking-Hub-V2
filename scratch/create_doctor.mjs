
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const client = createClient({
  url: 'file:D:/MedicalBooking-Hub/sqlite.db',
});

async function createDoctor() {
  const firstName = 'Dummy';
  const lastName = 'Doctor';
  const email = 'dummy_doctor@esaal.com';
  const password = 'password123';
  const phone = '01234567890';
  const specialty = JSON.stringify(['Psychiatry']);
  const type = 'psychiatrist';
  const gender = 'male';
  const price = 500;
  const bio = 'This is a dummy doctor for testing.';
  const yearsExperience = 10;
  const languages = JSON.stringify(['Arabic', 'English']);
  const sessionType = 'individual';
  const paymentInfo = 'Vodafone Cash: 01234567890';

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    // Create User
    const userRes = await client.execute({
      sql: `INSERT INTO users (first_name, last_name, email, password_hash, phone, role, is_email_verified, preferred_lang, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
      args: [firstName, lastName, email, passwordHash, phone, 'doctor', 1, 'en', new Date().toISOString()]
    });

    const userId = userRes.rows[0].id;

    // Create Doctor Profile
    await client.execute({
      sql: `INSERT INTO doctors (user_id, specialty, type, gender, price, bio, years_experience, languages, session_type, payment_info, is_online, immediate_available, free_consultation, rating, review_count, is_approved)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [userId, specialty, type, gender, price, bio, yearsExperience, languages, sessionType, paymentInfo, 0, 0, 0, 5, 0, 1]
    });

    console.log('Doctor created successfully!');
    console.log('Email: ' + email);
    console.log('Password: ' + password);
  } catch (error) {
    console.error('Error creating doctor:', error);
  } finally {
    client.close();
  }
}

createDoctor();
