const createStore = () => {
  const tables = {
    customer: {
      1: { name: 'John' },
      2: { name: 'Chris' },
      3: { name: 'Vic' }
    },
    food: {
      1: ['Cake', 'Waffle'],
      2: ['Burgers', 'stake'],
      3: ['Avocado', 'stuff']
    }
  };

  return {
    get: (table, id) => delay(1000).then(() => tables[table][id])
  };
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default createStore;
