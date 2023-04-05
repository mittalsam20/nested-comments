export const getComments = () => {
  return [
    {
      id: '1',
      body: 'First comment',
      userName: 'Sam',
      userId: '1',
      parentId: null,
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '2',
      body: 'Second comment',
      userName: 'Rahul',
      userId: '2',
      parentId: null,
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '3',
      body: 'First comment first child',
      userName: 'rohan',
      userId: '2',
      parentId: '1',
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '4',
      body: 'Second comment second child',
      userName: 'John',
      userId: '2',
      parentId: '2',
      createdAt: '2021-08-16T23:00:33.010+02:00'
    },
    {
      id: '5',
      body: 'nested Second comment second child',
      userName: 'John',
      userId: '2',
      parentId: '4',
      createdAt: '2021-09-16T23:00:33.010+02:00'
    },
    {
      id: '6',
      body: 'sdsdsdsd First comment',
      userName: 'Sam',
      userId: '1',
      parentId: '4',
      createdAt: '2021-08-16T23:00:33.010+02:00'
    }
  ]
}
