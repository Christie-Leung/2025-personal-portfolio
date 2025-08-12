import { CGCodegenType } from '~/types';

const CG_CODEGEN_TYPE = ['server', 'client', 'frontend'];
export const getGeneratorType = (): CGCodegenType => {
  const type = process.env.OPEN_API_GENERATOR || ('server' as CGCodegenType);
  if (!CG_CODEGEN_TYPE.includes(type)) {
    throw new Error(`Unknown server type ${type}`);
  }

  return type as CGCodegenType;
};

export const isServer = () => {
  return getGeneratorType() === 'server';
};

export const isClient = () => {
  return getGeneratorType() === 'client';
};

export const isFrontEnd = () => {
  return getGeneratorType() === 'frontend';
};

