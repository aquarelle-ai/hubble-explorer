
export class FullBlockItem {
    hash: string;
    height: number;
    timestamp: number;
    payload: BlockPayload;
    previousHash: string;
    previousAddress: string;
    evidence: any;
}

export class BlockPayload {
    averagePrice: number;
}