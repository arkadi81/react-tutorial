// since this is mimicking backend, it is ideal to implement the "API" along with the backend as well,
// do not leave crud operations up to front end!

const fakeData = [
  {
    id: 1,
    name: "fakename1",
    age: 10
  },
  {
    id: 2,
    name: "fakename2",
    age: 20
  },
  {
    id: 3,
    name: "fakename3",
    age: 30
  },
  {
    id: 4,
    name: "fakename4",
    age: 40
  },
  {
    id: 5,
    name: "fakename5",
    age: 50
  },
  {
    id: 6,
    name: "fakename6",
    age: 60
  }
];

export function getTableData() {
  return fakeData;
}
