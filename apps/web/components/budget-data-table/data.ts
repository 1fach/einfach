export interface Budget {
  id: string
  group: string
  assigned: number
  activity: number
  available: number
  categories: Budget[]
}

export const data: Budget[] = [
  {
    id: '1',
    group: 'Food',
    assigned: 500,
    activity: 400,
    available: 100,
    categories: [
      {
        id: '1.1',
        group: 'Groceries',
        assigned: 300,
        activity: 250,
        available: 50,
        categories: [],
      },
      {
        id: '1.2',
        group: 'Dining Out',
        assigned: 200,
        activity: 150,
        available: 50,
        categories: [],
      },
    ],
  },
  {
    id: '2',
    group: 'Transportation',
    assigned: 200,
    activity: 180,
    available: 20,
    categories: [
      {
        id: '2.1',
        group: 'Gas',
        assigned: 100,
        activity: 90,
        available: 10,
        categories: [],
      },
      {
        id: '2.2',
        group: 'Public Transport',
        assigned: 100,
        activity: 90,
        available: 10,
        categories: [],
      },
    ],
  },
  {
    id: '3',
    group: 'Entertainment',
    assigned: 100,
    activity: 80,
    available: 20,
    categories: [
      {
        id: '3.1',
        group: 'Movies',
        assigned: 50,
        activity: 40,
        available: 10,
        categories: [],
      },
      {
        id: '3.2',
        group: 'Concerts',
        assigned: 50,
        activity: 40,
        available: 10,
        categories: [],
      },
    ],
  },
]
