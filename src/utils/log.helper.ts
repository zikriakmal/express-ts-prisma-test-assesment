import prisma from "../database/prisma";

const logDatabaseChange = async (action: string, model: string, recordId: number, oldData: any, newData: any, userId: number) => {
    await prisma.log.create({
        data: {
            action: action,
            model: model,
            recordId: recordId,
            oldData: oldData ? JSON.stringify(oldData) : undefined,
            newData: newData ? JSON.stringify(newData) : undefined,
            userId: userId,
        },
    });
};

export default logDatabaseChange;