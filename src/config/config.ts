class Config {
    public static dbURI: any = {
        dev: "mongodb://user1:alegory13@ds115592.mlab.com:15592/back-marius-pas",
        test: "mongodb://user1:alegory13@ds115592.mlab.com:15592/back-marius-pas"
    }

    public static port: number = 8080;
}

export = Config;
