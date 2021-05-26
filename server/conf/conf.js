// conf/db.js
// MySQL数据库联接配置
module.exports = {
  mysql: {
    host: '121.196.159.62',
    user: 'LWF',
    password: 'LWF13425412561',
    database:'node_express', // 前面建的user表位于这个数据库中
    port: 3306,
    charset:'UTF8_GENERAL_CI'
  }
};
