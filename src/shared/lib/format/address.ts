import { Address } from '@ton/core';
import { TonAddress } from 'src/shared';

export function toUserFriendlyAddress(rawAddress: string): string {
    return Address.parse(rawAddress).toString();
}

export function sliceAddress(
    address: string | TonAddress | Address,
    options?: { headLength?: number; tailLength?: number; bounceable?: boolean }
): string {
    const headLength = options?.headLength || 6;
    const tailLength = options?.headLength || 4;
    if (address instanceof TonAddress) {
        address = address.userFriendly;
    }
    if (address instanceof Address) {
        address = address.toString({ bounceable: options?.bounceable });
    }
    return `${address.slice(0, headLength)}…${address.slice(-tailLength)}`;
}
