import { enumType } from 'nexus';

export const Status = enumType({
    name: 'Status',
    members: ['PENDING', 'RUNNING', 'COMPLETED', 'FAILED'],
});
