export const userInfo = {
  email: 'user@user.com',
  password: 'secret_user'
}

export const wrongUserInfo = {
  email: 'user@user.com',
  password: 'secretuser'
}

export const userTokenMock = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20ifSwiaWF0IjoxNjc0NTA1MTkzLCJleHAiOjE2NzUxMDk5OTN9.BpmNbXINIK4Zk242B5_58XrtmUT8-huAZ8nGI5u5SE0'
}

export const userMock = {
  dataValues: {
    id: 2,
    username: 'User',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
}

export const JWTUserMock = {
  data: { id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com' },
  iat: 1674501967,
  exp: 1675106767
}