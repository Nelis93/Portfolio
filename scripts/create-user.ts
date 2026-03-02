import {createUser} from '../src/utils/auth'

const args = process.argv.slice(2)

if (args.length < 3) {
  console.error('Usage: ts-node scripts/create-user.ts <username> <email> <password>')
  process.exit(1)
}

const [username, email, password] = args

createUser(username, email, password)
  .then(() => {
    console.log(`✅ User '${username}' created successfully with email '${email}'`)
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error creating user:', error)
    process.exit(1)
  })
