import Customer, { ICustomer } from "./customer";
import CustomError from "../utils/customError";

export default class CustomerService {

    public constructor () {}

    public async newCustomer(newCustomer: ICustomer): Promise<ICustomer> {

        if (await Customer.findOne({ cpf: newCustomer.cpf })) {
            throw new CustomError('Já existe um cliente cadastrado com este CPF!', 400, true);
        }
    
        try {
                    
            await Customer.create(newCustomer);
    
            return newCustomer;
    
        } catch (error) {
           throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async changeCustomerEmail(id: string, email: string) {

        try {
            const customer = await Customer.findById(id);

            if (!customer) {
                throw new CustomError('Não foi encontrado um cliente com o ID informado', 400, true);
            }

            await Customer.updateOne({ _id: id }, { email: email });

        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async changeCustomerName(id: string, name: string) {

        try {
            const customer = await Customer.findById(id);

            if (!customer) {
                throw new CustomError('Não foi encontrado um cliente com o ID informado', 400, true);
            }

            await Customer.updateOne({ _id: id }, { name: name });

        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async changeCustomerShortName(id: string, name: string) {

        try {
            const customer = await Customer.findById(id);

            if (!customer) {
                throw new CustomError('Não foi encontrado um cliente com o ID informado', 400, true);
            }

            await Customer.updateOne({ _id: id }, { shortName: name });

        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async changeCustomerCpf(id: string, cpf: string) {

        try {
            
            if (await Customer.findOne({ cpf: cpf })) {
                throw new CustomError('Já existe um cliente cadastrado com este CPF!', 400, true);
            }
            
            const customer = await Customer.findById(id);

            if (!customer) {
                throw new CustomError('Não foi encontrado um cliente com o ID informado', 400, true);
            }

            await Customer.updateOne({ id }, { cpf });

        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async delete(id: string) {

        try {
            const customer = await Customer.findById(id);

            if (!customer) {
                throw new CustomError('Não foi encontrado um cliente com o ID informado', 400, true);
            }

            await Customer.deleteOne({ _id: id });

        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }

    public async getAll(): Promise<ICustomer[]> {
        const customers = await Customer.find();

        return customers;
    }

    public async getById(id: string): Promise<ICustomer> {

        try {
            const customer = await Customer.findById(id);

            if (!customer) {
                throw new CustomError('Não foi encontrado um cliente com o ID informado', 400, true);
            }

            return customer;
        } catch(error) {
            throw new CustomError(error.message, 400, error.isOperational || false);
        }
    }
}