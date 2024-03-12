// import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const data = [...Array(10)].map(() => ({
    id: faker.string.uuid(),
    code: faker.random.numeric(6),
    name: faker.commerce.productName(),
    image: faker.image.imageUrl(),
    location: faker.address.country(),
    resume: faker.random.word(),
    purchaseDate: faker.datatype.datetime(),
    serialNumber: faker.random.alphaNumeric(10),
}));

