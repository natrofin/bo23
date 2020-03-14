module.exports = {
  name: 'Users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    userid: {
      type: 'int',
    },
    clanid: {
      type: 'int',
      default: -1
    },
    coins: {
      type: 'int',
      default: 0
    },
    lvl: {
      type: 'int',
      default: 1
    },
    xp: {
      type: 'int',
      default: 0
    },
    senders: {
      type: 'text',
      default: ""
    },
    partner: {
      type: 'text',
      default: "0"
    },
    bonustime: {
      type: 'text',
      default: 0
    },
    marks: {
      type: 'text',
      default: '🔰'
    },
    messages: {
      type: 'int',
      default: 0
    },
    worklvl: {
      type: 'int',
      default: 0
    },
    workcount: {
      type: 'int',
      default: 0
    },
    workdate: {
      type: 'int',
      default: 0
    },
    sended: {
      type: 'text',
      default: '0'
    },
    rubles: {
      type: 'float',
      default: 0.00
    },
    activebill: {
      type: 'text',
      default: '0'
    }
  },
};
