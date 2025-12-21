import { getKeystoneContext } from 'livoice-api/context/keystoneContext';

export const getPrismaSudo = async () => (await getKeystoneContext()).sudo().prisma;
