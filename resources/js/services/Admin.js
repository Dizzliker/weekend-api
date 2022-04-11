import Weekend from "./Weekend";

class Admin extends Weekend {
    getCounts = async () => {
        return await this.getData('/counts');
    }
}

export {Admin as AdminService};