import createRegistry from 'mag-service-registry';


/**
 * 
 */
export class RegistryBucket<T = any> {
    private _data: T;
    private _register: (services: T) => void;
    private _listener?: (data: T, appendData: T) => void;


    /** Initialice new RegistryBucket */
    public constructor() {
        const registry = createRegistry();

        this._listener = undefined;
        this._register = registry.register;
        this._data = registry.exposeRegistered();
    }

    /** get refistri data entry */
    public get registry(): T {
        return this._data;
    }
    /**
     * Register new data in the registry
     * @param next New value to be include in the register
     * @param append If true added next to the existance values, replade in other case
     */
    public register(next: T, append?: boolean) {
        const aux = append ? { ...this._data, ...next } : { ...next };

        this._register(aux);
        if (this._listener) {
            this._listener(aux, next);
        }
    };
    /**
     * Assing listener object that will be execute when register a new entry
     * @param listener: 
     */
    public listener(listener: (data: T, appendData: T) => void) {
        this._listener = listener;
    }
}

/** Create new instance of Registry */
const initRegistry = <T = any>() => new RegistryBucket<T>();

export default initRegistry;