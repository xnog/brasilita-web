/**
 * Script para resetar senha de usuário manualmente
 * 
 * Uso: node scripts/reset-user-password.js <email> <nova-senha>
 * Exemplo: node scripts/reset-user-password.js usuario@email.com minhaNovaSenh@123
 */

const postgres = require('postgres');
const bcrypt = require('bcryptjs');

async function resetUserPassword() {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.error('❌ Uso incorreto!');
        console.log('📝 Uso: node scripts/reset-user-password.js <email> <nova-senha>');
        console.log('📝 Exemplo: node scripts/reset-user-password.js usuario@email.com minhaNovaSenh@123');
        process.exit(1);
    }

    const [email, newPassword] = args;

    if (!email || !newPassword) {
        console.error('❌ Email e senha são obrigatórios');
        process.exit(1);
    }

    if (newPassword.length < 6) {
        console.error('❌ A senha deve ter pelo menos 6 caracteres');
        process.exit(1);
    }

    try {
        // Conectar ao banco
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            console.error('❌ DATABASE_URL não encontrada no .env');
            process.exit(1);
        }

        const sql = postgres(connectionString);

        console.log('🔍 Procurando usuário...');

        // Buscar usuário
        const userResult = await sql`
            SELECT id, name, email, password 
            FROM "user" 
            WHERE email = ${email}
            LIMIT 1
        `;

        if (userResult.length === 0) {
            console.error(`❌ Usuário com email "${email}" não encontrado`);
            await sql.end();
            process.exit(1);
        }

        const user = userResult[0];
        console.log(`✅ Usuário encontrado: ${user.name || 'Sem nome'} (${user.email})`);

        // Hash da nova senha
        console.log('🔐 Gerando hash da nova senha...');
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Atualizar senha
        console.log('💾 Atualizando senha no banco...');
        await sql`
            UPDATE "user" 
            SET password = ${hashedPassword}
            WHERE id = ${user.id}
        `;

        console.log('✅ Senha resetada com sucesso!');
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Nova senha: ${newPassword}`);
        console.log('');
        console.log('🎉 O usuário já pode fazer login com a nova senha!');

        await sql.end();

    } catch (error) {
        console.error('❌ Erro ao resetar senha:', error.message);
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    resetUserPassword();
}

module.exports = { resetUserPassword };
