import { validate } from "class-validator";

class Utils {

    public async errors (errors: any) {

        const problems = await validate(errors).then(errors => {
            
            if (errors.length > 0) {
                
                return errors;

            }

        });

        return {
            code: 400,
            message: 'Erorrs.',
            data: problems
        }

    }

}

export default new Utils();
