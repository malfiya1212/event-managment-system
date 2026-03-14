const { User } = require('./models');
const sequelize = require('./config/db');

const createAdmin = async () => {
    try {
        console.log("Connecting to database...");
        await sequelize.authenticate();
        console.log("Database connected. Syncing models...");
        await sequelize.sync();
        
        const adminEmail = "admin@eventmaster.io";
        const adminPassword = "adminpassword123";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });
        if (existingAdmin) {
            console.log(`Admin with email ${adminEmail} already exists. Updating role to admin...`);
            existingAdmin.role = 'admin';
            await existingAdmin.save();
        } else {
            console.log(`Creating new admin: ${adminEmail}...`);
            await User.create({
                name: "Master Admin",
                email: adminEmail,
                password: adminPassword,
                role: "admin"
            });
        }
        
        console.log("\n--------------------------------------------------");
        console.log("SUCCESS: Admin credentials are ready!");
        console.log(`Email:    ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log("--------------------------------------------------\n");
        process.exit(0);
    } catch (err) {
        console.error("ERROR creating admin:", err.message);
        process.exit(1);
    }
};

createAdmin();
