const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {
            name: 'bobby',
            id: 'fhaeuhfiw'
        },
        zookeepers
    );

    expect(zookeeper.name).toBe('bobby');
    expect(zookeeper.id).toBe('fhaeuhfiw');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 23,
            favoriteAnimal: "panda",
          },
          {
            id: "4",
            name: "Noel",
            age: 45,
            favoriteAnimal: "bear",
          },
    ];

    const updatedZookeepers = filterByQuery({age: 23}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 23,
            favoriteAnimal: "panda",
          },
          {
            id: "4",
            name: "Noel",
            age: 45,
            favoriteAnimal: "bear",
          },
    ];

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Erica');
});

test('validate favorite animal', () => {
    const validZookeeper = {
        id: "3",
        name: "Erica",
        age: 23,
        favoriteAnimal: "panda",
      };

      const invalidZookeeper = {
        id: "3",
        name: "Erica",
        age: 23,
      };
    const result = validateZookeeper(validZookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});