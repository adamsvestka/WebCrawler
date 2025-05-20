import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const date = asNexusMethod(DateTimeResolver, 'date', 'Date');
export const url = asNexusMethod(URLResolver, 'url', 'URL');
