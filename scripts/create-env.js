const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Path to .env.local file
const envPath = path.join(__dirname, "..", ".env.local");

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Warning: .env.local file already exists. Creating a new one will overwrite it."
  );
  rl.question("Do you want to continue? (y/n) ", (answer) => {
    if (answer.toLowerCase() === "y") {
      createEnvFile();
    } else {
      console.log(
        "Operation cancelled. Existing .env.local file was preserved."
      );
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "Setting up admin credentials for your restaurant menu app"
  );
  console.log("Press Enter to use default values");

  rl.question("Admin username (default: admin): ", (username) => {
    const adminUsername = username || "admin";

    rl.question("Admin password (default: admin123): ", (password) => {
      const adminPassword = password || "admin123";

      // Create the .env.local content
      const envContent = `# Admin Credentials
NEXT_PUBLIC_ADMIN_USERNAME=${adminUsername}
NEXT_PUBLIC_ADMIN_PASSWORD=${adminPassword}
`;

      // Write to .env.local file
      fs.writeFileSync(envPath, envContent);

      console.log(
        "\x1b[32m%s\x1b[0m",
        "\n✅ .env.local file created successfully with your admin credentials!"
      );
      console.log(
        "You can now access the admin dashboard at /dashboard/login with:"
      );
      console.log(`   Username: ${adminUsername}`);
      console.log(`   Password: ${adminPassword}`);
      console.log(
        "\nRestart your development server to apply these changes.\n"
      );

      rl.close();
    });
  });
}
