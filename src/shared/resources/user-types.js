const permissions = {

  USER_ADMIN: {
    FIND_ALL: true,
    FIND_ONE: true,
    FIND_PAGINATION: true,
    CREATE: true,
    UPDATE: true,
    DELETE: true
  },
  
  USER_READ: {
    FIND_ALL: true,
    FIND_ONE: true,
    FIND_PAGINATION: true,
    CREATE: false,
    UPDATE: false,
    DELETE: false
  }
}


module.exports = permissions;