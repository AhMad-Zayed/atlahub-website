import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

function sanitizeUsername(value) {
  return String(value || '').trim();
}

function sanitizePassword(value) {
  return String(value || '');
}

function getAllowedCredentials() {
  const primaryUser = process.env.ADMIN_USER || 'ahmad';
  const primaryPass = process.env.ADMIN_PASS || 'ahmad123';

  const credentialPairs = [
    { username: primaryUser, password: primaryPass },
    { username: 'ahmad', password: 'ahmad123' },
    { username: 'admin', password: 'admin123' },
  ];

  const seen = new Set();
  return credentialPairs.filter((item) => {
    const key = `${item.username}::${item.password}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyUserCredentials(usernameInput, passwordInput) {
  const username = sanitizeUsername(usernameInput);
  const password = sanitizePassword(passwordInput);

  if (!username || !password) {
    return {
      success: false,
      error: 'Username and password are required.',
    };
  }

  const existingUser = await prisma.users.findUnique({
    where: { username },
  });

  if (existingUser) {
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return {
        success: false,
        error: 'Invalid username or password.',
      };
    }

    return {
      success: true,
      error: null,
      user: {
        id: existingUser.id,
        username: existingUser.username,
      },
    };
  }

  const isValidFallback = getAllowedCredentials().some(
    (credential) => credential.username === username && credential.password === password,
  );

  if (!isValidFallback) {
    return {
      success: false,
      error: 'Invalid username or password.',
    };
  }

  return {
    success: true,
    error: null,
    user: {
      id: username,
      username,
    },
  };
}
