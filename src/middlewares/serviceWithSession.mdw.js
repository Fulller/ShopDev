import _ from "lodash";
import mongoose from "mongoose";

async function serviceWithSession(callback, params) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await callback(params, session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
export default serviceWithSession;
