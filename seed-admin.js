const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const email = "oretachinocurryya@gmail.com";
  const password = "AdminPassword123!"; // Default password

  console.log(`Checking if user ${email} exists...`);

  // We try to create the user directly
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already registered")) {
      console.log(`User ${email} already exists! You can log in with your existing password.`);
    } else {
      console.error("Error creating user:", error.message);
    }
  } else {
    console.log(`Successfully created admin user!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Please login and change your password later.`);
  }
}

createAdmin();
