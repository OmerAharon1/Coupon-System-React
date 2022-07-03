class Globals {
}

class DevelopmentGlobals extends Globals {
    public urls = {
        customer: 'http://localhost:8080/customer/',
        admin: 'http://localhost:8080/admin/',
        company: 'http://localhost:8080/company/'


    }
}

class ProductionGlobals extends Globals {
    public urls = {
        customer: 'http://localhost:8080/customer/',
        admin: 'http://localhost:8080/admin/',
        company: 'http://localhost:8080/company/'
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;