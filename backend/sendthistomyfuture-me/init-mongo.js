db.createUser({
  user: 'nestuser',
  pwd: 'nestuser',
  roles: [
    {
      role: 'readWrite',
      db: 'nestdb',
    },
  ],
});

db = new Mongo().getDB('nestdb');

db.createCollection('users', { capped: false });
db.createCollection('products', { capped: false });

db.products.insert([
  { item: 1 },
  { item: 2 },
  { item: 3 },
  { item: 4 },
  { item: 5 },
]);

db.products.save();
