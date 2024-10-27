// db.ts
import Dexie, { type EntityTable, type Transaction } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

const db = new Dexie('InspectionsDatabase') as Dexie & {
  inspections: EntityTable<Inspection, 'inspectionId'>
  properties: EntityTable<Property, 'propertyId'>
  clients: EntityTable<Client, 'clientId'>
  inspectors: EntityTable<Inspector, 'inspectorId'>
  inspectionFindings: EntityTable<InspectionFinding, 'findingId'>
}

// Schema declaration:
db.version(1).stores({
  inspections:
    'inspectionId, propertyId, inspectorId, clientId, inspectionDate, status',
  properties: 'propertyId, address, city, state, zipCode, country',
  clients: 'clientId, firstName, lastName, phone, email',
  inspectors: 'inspectorId, firstName, lastName, phone, email, certification',
  inspectionFindings: 'findingId, inspectionId, description, severity',
})

db.on('populate', async function (transaction) {
  await populateSampleData(transaction)
})

export { db }

export type InspectionStatus = 'scheduled' | 'completed' | 'canceled'

export interface Inspection {
  inspectionId: string
  propertyId: string
  inspectorId: string
  clientId: string
  inspectionDate: string // ISO date string (e.g., '2023-10-26')
  status: InspectionStatus
}

export interface Property {
  propertyId: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  description: string
}

export interface Client {
  clientId: string
  firstName: string
  lastName: string
  phone?: string
  email?: string
}

export interface Inspector {
  inspectorId: string
  firstName: string
  lastName: string
  phone?: string
  email?: string
  certification?: string
}

export interface InspectionFinding {
  findingId: string
  inspectionId: string
  description: string
  latitude: number
  longitude: number
  type: 'GOOD' | 'WARNING' | 'CRITICAL'
  photo: ArrayBuffer
}

export type InspectionAction = {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  iconForeground: string
  iconBackground: string
  cardBackground: string
  type: 'GOOD' | 'WARNING' | 'CRITICAL'
}

export type AllInpectionInfo = {
  inspectionInfo: Inspection
  clientInfo: Client
  propertyInfo: Property
  inspectorInfo: Inspector
  inspectionFindings: InspectionFinding[]
}

// Method to insert sample data
async function populateSampleData(transaction: Transaction) {
  try {
    const properties: Property[] = [
      {
        city: 'Anytown',
        state: 'State',
        zipCode: '12345',
        country: 'Country',
        propertyId: uuidv4(),
        address: '123 Main St',
        description: 'Big blue house on the corner.',
      },
      {
        city: 'Othertown',
        state: 'State',
        zipCode: '54321',
        country: 'Country',
        propertyId: uuidv4(),
        address: '456 Elm St',
        description: 'Small red house on the other corner.',
      },
    ]

    await transaction.table('properties').bulkAdd(properties, {
      allKeys: true,
    })

    const clients: Client[] = [
      {
        clientId: uuidv4(),
        firstName: 'Alice',
        lastName: 'Smith',
      },
      {
        clientId: uuidv4(),
        firstName: 'Bob',
        lastName: 'Jones',
      },
    ]

    await transaction.table('clients').bulkAdd(clients, {
      allKeys: true,
    })

    const inspectors: Inspector[] = [
      {
        inspectorId: uuidv4(),
        firstName: 'Eve',
        lastName: 'Davis',
        email: 'eve@example.com',
        certification: 'Certified Inspector',
      },
      {
        inspectorId: uuidv4(),
        firstName: 'Frank',
        lastName: 'Miller',
        email: 'frank@example.com',
        certification: 'Senior Inspector',
      },
    ]

    await transaction.table('inspectors').bulkAdd(inspectors, {
      allKeys: true,
    })

    // const inspections: Inspection[] = [
    //   {
    //     inspectionId: uuidv4(),
    //     propertyId: propertyIds[0],
    //     inspectorId: inspectorIds[0],
    //     clientId: clientIds[0],
    //     inspectionDate: new Date().toISOString().split('T')[0],
    //     status: 'scheduled',
    //   },
    //   {
    //     inspectionId: uuidv4(),
    //     propertyId: propertyIds[1],
    //     inspectorId: inspectorIds[1],
    //     clientId: clientIds[1],
    //     inspectionDate: new Date().toISOString().split('T')[0],
    //     status: 'completed',
    //   },
    //   {
    //     inspectionId: uuidv4(),
    //     propertyId: propertyIds[0],
    //     inspectorId: inspectorIds[1],
    //     clientId: clientIds[0],
    //     inspectionDate: new Date().toISOString().split('T')[0],
    //     status: 'canceled',
    //   },
    //   {
    //     inspectionId: uuidv4(),
    //     propertyId: propertyIds[1],
    //     inspectorId: inspectorIds[0],
    //     clientId: clientIds[1],
    //     inspectionDate: new Date().toISOString().split('T')[0],
    //     status: 'scheduled',
    //   },
    // ]

    // const inspectionIds = await transaction
    //   .table('inspections')
    //   .bulkAdd(inspections, {
    //     allKeys: true,
    //   })

    // const inspectionFindings: InspectionFinding[] = [
    //   {
    //     findingId: uuidv4(),
    //     inspectionId: inspectionIds[0],
    //     description: 'Exposed wiring in the attic.',
    //     latitude: 37.7749,
    //     longitude: 122.4194,
    //     photo: new ArrayBuffer(0),
    //     type: 'CRITICAL',
    //   },
    //   {
    //     findingId: uuidv4(),
    //     inspectionId: inspectionIds[1],
    //     description: 'Cracked foundation in the basement.',
    //     latitude: 37.7749,
    //     longitude: 122.4194,
    //     photo: new ArrayBuffer(0),
    //     type: 'WARNING',
    //   },
    // ]

    // await db.inspectionFindings.bulkAdd(inspectionFindings)

    // console.log('Sample data inserted successfully.')
  } catch (error) {
    console.error('Error populating sample data:', error)
  }
}
