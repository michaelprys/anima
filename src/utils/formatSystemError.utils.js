export const formatSystemError = (error) => {
    return error?.message
        ? `ERR_0x${error.status || '500'}:_${error.message
              .toUpperCase()
              .replace(/[^A-Z0-9\s]/g, '')
              .replace(/\s+/g, '_')}`
        : 'ERR_0xXXX:_SYSTEM_FAILURE';
};
