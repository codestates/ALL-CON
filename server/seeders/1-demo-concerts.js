'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Concerts', [
      
    {
      id: 1,
      exclusive: 'YES24',
      open_date: new Date(),
      post_date: new Date(),
      image_concert: 'TEST',
      title: 'TEST',
      period: 'TEST',
      show_schedule: 'TEST',
      place: 'TEST',
      price: 'TEST',
      running_time: 'TEST',
      rating: 'TEST',
      link: 'TEST',
      view: 0,
      total_comment: 0
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Concerts', null, {})
  }
};
