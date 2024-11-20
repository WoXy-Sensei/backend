import mongoose from 'mongoose';

export interface ITestModel extends mongoose.Document {
    name: string;
}

const TestSchema = new mongoose.Schema<ITestModel>({
    name: { type: String, required: true },
});

const TestModel = mongoose.model<ITestModel>('Test', TestSchema);

export default TestModel;
