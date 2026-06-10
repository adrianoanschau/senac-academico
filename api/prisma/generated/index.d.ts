
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Professor
 * 
 */
export type Professor = $Result.DefaultSelection<Prisma.$ProfessorPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Curriculum
 * 
 */
export type Curriculum = $Result.DefaultSelection<Prisma.$CurriculumPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model CurriculumSubject
 * 
 */
export type CurriculumSubject = $Result.DefaultSelection<Prisma.$CurriculumSubjectPayload>
/**
 * Model ClassGroup
 * 
 */
export type ClassGroup = $Result.DefaultSelection<Prisma.$ClassGroupPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model ScheduleOverride
 * 
 */
export type ScheduleOverride = $Result.DefaultSelection<Prisma.$ScheduleOverridePayload>
/**
 * Model ScheduleRule
 * 
 */
export type ScheduleRule = $Result.DefaultSelection<Prisma.$ScheduleRulePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OverrideType: {
  BLOCK: 'BLOCK',
  EXTRA_DAY: 'EXTRA_DAY'
};

export type OverrideType = (typeof OverrideType)[keyof typeof OverrideType]


export const ClassStatus: {
  PLANNED: 'PLANNED',
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type ClassStatus = (typeof ClassStatus)[keyof typeof ClassStatus]

}

export type OverrideType = $Enums.OverrideType

export const OverrideType: typeof $Enums.OverrideType

export type ClassStatus = $Enums.ClassStatus

export const ClassStatus: typeof $Enums.ClassStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Professors
 * const professors = await prisma.professor.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Professors
   * const professors = await prisma.professor.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.professor`: Exposes CRUD operations for the **Professor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professors
    * const professors = await prisma.professor.findMany()
    * ```
    */
  get professor(): Prisma.ProfessorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.curriculum`: Exposes CRUD operations for the **Curriculum** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Curricula
    * const curricula = await prisma.curriculum.findMany()
    * ```
    */
  get curriculum(): Prisma.CurriculumDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.curriculumSubject`: Exposes CRUD operations for the **CurriculumSubject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CurriculumSubjects
    * const curriculumSubjects = await prisma.curriculumSubject.findMany()
    * ```
    */
  get curriculumSubject(): Prisma.CurriculumSubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.classGroup`: Exposes CRUD operations for the **ClassGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClassGroups
    * const classGroups = await prisma.classGroup.findMany()
    * ```
    */
  get classGroup(): Prisma.ClassGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scheduleOverride`: Exposes CRUD operations for the **ScheduleOverride** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScheduleOverrides
    * const scheduleOverrides = await prisma.scheduleOverride.findMany()
    * ```
    */
  get scheduleOverride(): Prisma.ScheduleOverrideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scheduleRule`: Exposes CRUD operations for the **ScheduleRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScheduleRules
    * const scheduleRules = await prisma.scheduleRule.findMany()
    * ```
    */
  get scheduleRule(): Prisma.ScheduleRuleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Professor: 'Professor',
    Room: 'Room',
    Course: 'Course',
    Curriculum: 'Curriculum',
    Subject: 'Subject',
    CurriculumSubject: 'CurriculumSubject',
    ClassGroup: 'ClassGroup',
    Schedule: 'Schedule',
    ScheduleOverride: 'ScheduleOverride',
    ScheduleRule: 'ScheduleRule'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "professor" | "room" | "course" | "curriculum" | "subject" | "curriculumSubject" | "classGroup" | "schedule" | "scheduleOverride" | "scheduleRule"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Professor: {
        payload: Prisma.$ProfessorPayload<ExtArgs>
        fields: Prisma.ProfessorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findFirst: {
            args: Prisma.ProfessorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          findMany: {
            args: Prisma.ProfessorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          create: {
            args: Prisma.ProfessorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          createMany: {
            args: Prisma.ProfessorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          delete: {
            args: Prisma.ProfessorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          update: {
            args: Prisma.ProfessorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          deleteMany: {
            args: Prisma.ProfessorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>[]
          }
          upsert: {
            args: Prisma.ProfessorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessorPayload>
          }
          aggregate: {
            args: Prisma.ProfessorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessor>
          }
          groupBy: {
            args: Prisma.ProfessorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessorCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessorCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Curriculum: {
        payload: Prisma.$CurriculumPayload<ExtArgs>
        fields: Prisma.CurriculumFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CurriculumFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CurriculumFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>
          }
          findFirst: {
            args: Prisma.CurriculumFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CurriculumFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>
          }
          findMany: {
            args: Prisma.CurriculumFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>[]
          }
          create: {
            args: Prisma.CurriculumCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>
          }
          createMany: {
            args: Prisma.CurriculumCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CurriculumCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>[]
          }
          delete: {
            args: Prisma.CurriculumDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>
          }
          update: {
            args: Prisma.CurriculumUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>
          }
          deleteMany: {
            args: Prisma.CurriculumDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CurriculumUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CurriculumUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>[]
          }
          upsert: {
            args: Prisma.CurriculumUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumPayload>
          }
          aggregate: {
            args: Prisma.CurriculumAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurriculum>
          }
          groupBy: {
            args: Prisma.CurriculumGroupByArgs<ExtArgs>
            result: $Utils.Optional<CurriculumGroupByOutputType>[]
          }
          count: {
            args: Prisma.CurriculumCountArgs<ExtArgs>
            result: $Utils.Optional<CurriculumCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      CurriculumSubject: {
        payload: Prisma.$CurriculumSubjectPayload<ExtArgs>
        fields: Prisma.CurriculumSubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CurriculumSubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CurriculumSubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>
          }
          findFirst: {
            args: Prisma.CurriculumSubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CurriculumSubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>
          }
          findMany: {
            args: Prisma.CurriculumSubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>[]
          }
          create: {
            args: Prisma.CurriculumSubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>
          }
          createMany: {
            args: Prisma.CurriculumSubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CurriculumSubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>[]
          }
          delete: {
            args: Prisma.CurriculumSubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>
          }
          update: {
            args: Prisma.CurriculumSubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>
          }
          deleteMany: {
            args: Prisma.CurriculumSubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CurriculumSubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CurriculumSubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>[]
          }
          upsert: {
            args: Prisma.CurriculumSubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CurriculumSubjectPayload>
          }
          aggregate: {
            args: Prisma.CurriculumSubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCurriculumSubject>
          }
          groupBy: {
            args: Prisma.CurriculumSubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<CurriculumSubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.CurriculumSubjectCountArgs<ExtArgs>
            result: $Utils.Optional<CurriculumSubjectCountAggregateOutputType> | number
          }
        }
      }
      ClassGroup: {
        payload: Prisma.$ClassGroupPayload<ExtArgs>
        fields: Prisma.ClassGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>
          }
          findFirst: {
            args: Prisma.ClassGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>
          }
          findMany: {
            args: Prisma.ClassGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>[]
          }
          create: {
            args: Prisma.ClassGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>
          }
          createMany: {
            args: Prisma.ClassGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>[]
          }
          delete: {
            args: Prisma.ClassGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>
          }
          update: {
            args: Prisma.ClassGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>
          }
          deleteMany: {
            args: Prisma.ClassGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>[]
          }
          upsert: {
            args: Prisma.ClassGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassGroupPayload>
          }
          aggregate: {
            args: Prisma.ClassGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassGroup>
          }
          groupBy: {
            args: Prisma.ClassGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassGroupCountArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      ScheduleOverride: {
        payload: Prisma.$ScheduleOverridePayload<ExtArgs>
        fields: Prisma.ScheduleOverrideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleOverrideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleOverrideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>
          }
          findFirst: {
            args: Prisma.ScheduleOverrideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleOverrideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>
          }
          findMany: {
            args: Prisma.ScheduleOverrideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>[]
          }
          create: {
            args: Prisma.ScheduleOverrideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>
          }
          createMany: {
            args: Prisma.ScheduleOverrideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleOverrideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>[]
          }
          delete: {
            args: Prisma.ScheduleOverrideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>
          }
          update: {
            args: Prisma.ScheduleOverrideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleOverrideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleOverrideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleOverrideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleOverrideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleOverridePayload>
          }
          aggregate: {
            args: Prisma.ScheduleOverrideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScheduleOverride>
          }
          groupBy: {
            args: Prisma.ScheduleOverrideGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleOverrideGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleOverrideCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleOverrideCountAggregateOutputType> | number
          }
        }
      }
      ScheduleRule: {
        payload: Prisma.$ScheduleRulePayload<ExtArgs>
        fields: Prisma.ScheduleRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>
          }
          findMany: {
            args: Prisma.ScheduleRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>[]
          }
          create: {
            args: Prisma.ScheduleRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>
          }
          createMany: {
            args: Prisma.ScheduleRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>
          }
          update: {
            args: Prisma.ScheduleRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleRulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScheduleRule>
          }
          groupBy: {
            args: Prisma.ScheduleRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleRuleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleRuleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    professor?: ProfessorOmit
    room?: RoomOmit
    course?: CourseOmit
    curriculum?: CurriculumOmit
    subject?: SubjectOmit
    curriculumSubject?: CurriculumSubjectOmit
    classGroup?: ClassGroupOmit
    schedule?: ScheduleOmit
    scheduleOverride?: ScheduleOverrideOmit
    scheduleRule?: ScheduleRuleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfessorCountOutputType
   */

  export type ProfessorCountOutputType = {
    schedules: number
    scheduleRules: number
  }

  export type ProfessorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | ProfessorCountOutputTypeCountSchedulesArgs
    scheduleRules?: boolean | ProfessorCountOutputTypeCountScheduleRulesArgs
  }

  // Custom InputTypes
  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessorCountOutputType
     */
    select?: ProfessorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * ProfessorCountOutputType without action
   */
  export type ProfessorCountOutputTypeCountScheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    schedules: number
    scheduleRules: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | RoomCountOutputTypeCountSchedulesArgs
    scheduleRules?: boolean | RoomCountOutputTypeCountScheduleRulesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountScheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    curriculums: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculums?: boolean | CourseCountOutputTypeCountCurriculumsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountCurriculumsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurriculumWhereInput
  }


  /**
   * Count Type CurriculumCountOutputType
   */

  export type CurriculumCountOutputType = {
    subjects: number
    classGroups: number
  }

  export type CurriculumCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subjects?: boolean | CurriculumCountOutputTypeCountSubjectsArgs
    classGroups?: boolean | CurriculumCountOutputTypeCountClassGroupsArgs
  }

  // Custom InputTypes
  /**
   * CurriculumCountOutputType without action
   */
  export type CurriculumCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumCountOutputType
     */
    select?: CurriculumCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CurriculumCountOutputType without action
   */
  export type CurriculumCountOutputTypeCountSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurriculumSubjectWhereInput
  }

  /**
   * CurriculumCountOutputType without action
   */
  export type CurriculumCountOutputTypeCountClassGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassGroupWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    curriculums: number
    schedules: number
    scheduleRules: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculums?: boolean | SubjectCountOutputTypeCountCurriculumsArgs
    schedules?: boolean | SubjectCountOutputTypeCountSchedulesArgs
    scheduleRules?: boolean | SubjectCountOutputTypeCountScheduleRulesArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountCurriculumsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurriculumSubjectWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountScheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
  }


  /**
   * Count Type ClassGroupCountOutputType
   */

  export type ClassGroupCountOutputType = {
    schedules: number
    scheduleRules: number
  }

  export type ClassGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | ClassGroupCountOutputTypeCountSchedulesArgs
    scheduleRules?: boolean | ClassGroupCountOutputTypeCountScheduleRulesArgs
  }

  // Custom InputTypes
  /**
   * ClassGroupCountOutputType without action
   */
  export type ClassGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroupCountOutputType
     */
    select?: ClassGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassGroupCountOutputType without action
   */
  export type ClassGroupCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * ClassGroupCountOutputType without action
   */
  export type ClassGroupCountOutputTypeCountScheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
  }


  /**
   * Count Type ScheduleRuleCountOutputType
   */

  export type ScheduleRuleCountOutputType = {
    schedules: number
    childRules: number
    dependentRules: number
  }

  export type ScheduleRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | ScheduleRuleCountOutputTypeCountSchedulesArgs
    childRules?: boolean | ScheduleRuleCountOutputTypeCountChildRulesArgs
    dependentRules?: boolean | ScheduleRuleCountOutputTypeCountDependentRulesArgs
  }

  // Custom InputTypes
  /**
   * ScheduleRuleCountOutputType without action
   */
  export type ScheduleRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRuleCountOutputType
     */
    select?: ScheduleRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ScheduleRuleCountOutputType without action
   */
  export type ScheduleRuleCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * ScheduleRuleCountOutputType without action
   */
  export type ScheduleRuleCountOutputTypeCountChildRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
  }

  /**
   * ScheduleRuleCountOutputType without action
   */
  export type ScheduleRuleCountOutputTypeCountDependentRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Professor
   */

  export type AggregateProfessor = {
    _count: ProfessorCountAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  export type ProfessorMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    degree: string | null
    department: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    degree: string | null
    department: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessorCountAggregateOutputType = {
    id: number
    name: number
    email: number
    degree: number
    department: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessorMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    degree?: true
    department?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessorMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    degree?: true
    department?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessorCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    degree?: true
    department?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professor to aggregate.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professors
    **/
    _count?: true | ProfessorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessorMaxAggregateInputType
  }

  export type GetProfessorAggregateType<T extends ProfessorAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessor[P]>
      : GetScalarType<T[P], AggregateProfessor[P]>
  }




  export type ProfessorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessorWhereInput
    orderBy?: ProfessorOrderByWithAggregationInput | ProfessorOrderByWithAggregationInput[]
    by: ProfessorScalarFieldEnum[] | ProfessorScalarFieldEnum
    having?: ProfessorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessorCountAggregateInputType | true
    _min?: ProfessorMinAggregateInputType
    _max?: ProfessorMaxAggregateInputType
  }

  export type ProfessorGroupByOutputType = {
    id: string
    name: string
    email: string
    degree: string | null
    department: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessorCountAggregateOutputType | null
    _min: ProfessorMinAggregateOutputType | null
    _max: ProfessorMaxAggregateOutputType | null
  }

  type GetProfessorGroupByPayload<T extends ProfessorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessorGroupByOutputType[P]>
        }
      >
    >


  export type ProfessorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    degree?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    schedules?: boolean | Professor$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | Professor$scheduleRulesArgs<ExtArgs>
    _count?: boolean | ProfessorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    degree?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    degree?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["professor"]>

  export type ProfessorSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    degree?: boolean
    department?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "degree" | "department" | "createdAt" | "updatedAt", ExtArgs["result"]["professor"]>
  export type ProfessorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | Professor$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | Professor$scheduleRulesArgs<ExtArgs>
    _count?: boolean | ProfessorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfessorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfessorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfessorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Professor"
    objects: {
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      scheduleRules: Prisma.$ScheduleRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      degree: string | null
      department: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professor"]>
    composites: {}
  }

  type ProfessorGetPayload<S extends boolean | null | undefined | ProfessorDefaultArgs> = $Result.GetResult<Prisma.$ProfessorPayload, S>

  type ProfessorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessorCountAggregateInputType | true
    }

  export interface ProfessorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Professor'], meta: { name: 'Professor' } }
    /**
     * Find zero or one Professor that matches the filter.
     * @param {ProfessorFindUniqueArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessorFindUniqueArgs>(args: SelectSubset<T, ProfessorFindUniqueArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Professor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessorFindUniqueOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessorFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessorFindFirstArgs>(args?: SelectSubset<T, ProfessorFindFirstArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindFirstOrThrowArgs} args - Arguments to find a Professor
     * @example
     * // Get one Professor
     * const professor = await prisma.professor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessorFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Professors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professors
     * const professors = await prisma.professor.findMany()
     * 
     * // Get first 10 Professors
     * const professors = await prisma.professor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professorWithIdOnly = await prisma.professor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessorFindManyArgs>(args?: SelectSubset<T, ProfessorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Professor.
     * @param {ProfessorCreateArgs} args - Arguments to create a Professor.
     * @example
     * // Create one Professor
     * const Professor = await prisma.professor.create({
     *   data: {
     *     // ... data to create a Professor
     *   }
     * })
     * 
     */
    create<T extends ProfessorCreateArgs>(args: SelectSubset<T, ProfessorCreateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Professors.
     * @param {ProfessorCreateManyArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessorCreateManyArgs>(args?: SelectSubset<T, ProfessorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Professors and returns the data saved in the database.
     * @param {ProfessorCreateManyAndReturnArgs} args - Arguments to create many Professors.
     * @example
     * // Create many Professors
     * const professor = await prisma.professor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessorCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Professor.
     * @param {ProfessorDeleteArgs} args - Arguments to delete one Professor.
     * @example
     * // Delete one Professor
     * const Professor = await prisma.professor.delete({
     *   where: {
     *     // ... filter to delete one Professor
     *   }
     * })
     * 
     */
    delete<T extends ProfessorDeleteArgs>(args: SelectSubset<T, ProfessorDeleteArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Professor.
     * @param {ProfessorUpdateArgs} args - Arguments to update one Professor.
     * @example
     * // Update one Professor
     * const professor = await prisma.professor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessorUpdateArgs>(args: SelectSubset<T, ProfessorUpdateArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Professors.
     * @param {ProfessorDeleteManyArgs} args - Arguments to filter Professors to delete.
     * @example
     * // Delete a few Professors
     * const { count } = await prisma.professor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessorDeleteManyArgs>(args?: SelectSubset<T, ProfessorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessorUpdateManyArgs>(args: SelectSubset<T, ProfessorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professors and returns the data updated in the database.
     * @param {ProfessorUpdateManyAndReturnArgs} args - Arguments to update many Professors.
     * @example
     * // Update many Professors
     * const professor = await prisma.professor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Professors and only return the `id`
     * const professorWithIdOnly = await prisma.professor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessorUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Professor.
     * @param {ProfessorUpsertArgs} args - Arguments to update or create a Professor.
     * @example
     * // Update or create a Professor
     * const professor = await prisma.professor.upsert({
     *   create: {
     *     // ... data to create a Professor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Professor we want to update
     *   }
     * })
     */
    upsert<T extends ProfessorUpsertArgs>(args: SelectSubset<T, ProfessorUpsertArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Professors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorCountArgs} args - Arguments to filter Professors to count.
     * @example
     * // Count the number of Professors
     * const count = await prisma.professor.count({
     *   where: {
     *     // ... the filter for the Professors we want to count
     *   }
     * })
    **/
    count<T extends ProfessorCountArgs>(
      args?: Subset<T, ProfessorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessorAggregateArgs>(args: Subset<T, ProfessorAggregateArgs>): Prisma.PrismaPromise<GetProfessorAggregateType<T>>

    /**
     * Group by Professor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessorGroupByArgs['orderBy'] }
        : { orderBy?: ProfessorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Professor model
   */
  readonly fields: ProfessorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Professor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedules<T extends Professor$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Professor$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scheduleRules<T extends Professor$scheduleRulesArgs<ExtArgs> = {}>(args?: Subset<T, Professor$scheduleRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Professor model
   */
  interface ProfessorFieldRefs {
    readonly id: FieldRef<"Professor", 'String'>
    readonly name: FieldRef<"Professor", 'String'>
    readonly email: FieldRef<"Professor", 'String'>
    readonly degree: FieldRef<"Professor", 'String'>
    readonly department: FieldRef<"Professor", 'String'>
    readonly createdAt: FieldRef<"Professor", 'DateTime'>
    readonly updatedAt: FieldRef<"Professor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Professor findUnique
   */
  export type ProfessorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findUniqueOrThrow
   */
  export type ProfessorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor findFirst
   */
  export type ProfessorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findFirstOrThrow
   */
  export type ProfessorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professor to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor findMany
   */
  export type ProfessorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter, which Professors to fetch.
     */
    where?: ProfessorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professors to fetch.
     */
    orderBy?: ProfessorOrderByWithRelationInput | ProfessorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professors.
     */
    cursor?: ProfessorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professors.
     */
    distinct?: ProfessorScalarFieldEnum | ProfessorScalarFieldEnum[]
  }

  /**
   * Professor create
   */
  export type ProfessorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to create a Professor.
     */
    data: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
  }

  /**
   * Professor createMany
   */
  export type ProfessorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professor createManyAndReturn
   */
  export type ProfessorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to create many Professors.
     */
    data: ProfessorCreateManyInput | ProfessorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professor update
   */
  export type ProfessorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The data needed to update a Professor.
     */
    data: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
    /**
     * Choose, which Professor to update.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor updateMany
   */
  export type ProfessorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
  }

  /**
   * Professor updateManyAndReturn
   */
  export type ProfessorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * The data used to update Professors.
     */
    data: XOR<ProfessorUpdateManyMutationInput, ProfessorUncheckedUpdateManyInput>
    /**
     * Filter which Professors to update
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to update.
     */
    limit?: number
  }

  /**
   * Professor upsert
   */
  export type ProfessorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * The filter to search for the Professor to update in case it exists.
     */
    where: ProfessorWhereUniqueInput
    /**
     * In case the Professor found by the `where` argument doesn't exist, create a new Professor with this data.
     */
    create: XOR<ProfessorCreateInput, ProfessorUncheckedCreateInput>
    /**
     * In case the Professor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessorUpdateInput, ProfessorUncheckedUpdateInput>
  }

  /**
   * Professor delete
   */
  export type ProfessorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
    /**
     * Filter which Professor to delete.
     */
    where: ProfessorWhereUniqueInput
  }

  /**
   * Professor deleteMany
   */
  export type ProfessorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professors to delete
     */
    where?: ProfessorWhereInput
    /**
     * Limit how many Professors to delete.
     */
    limit?: number
  }

  /**
   * Professor.schedules
   */
  export type Professor$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Professor.scheduleRules
   */
  export type Professor$scheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    cursor?: ScheduleRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * Professor without action
   */
  export type ProfessorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professor
     */
    select?: ProfessorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professor
     */
    omit?: ProfessorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessorInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    capacity: number | null
  }

  export type RoomSumAggregateOutputType = {
    capacity: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    name: string | null
    capacity: number | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    capacity: number | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    name: number
    capacity: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    capacity?: true
  }

  export type RoomSumAggregateInputType = {
    capacity?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    name?: true
    capacity?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    name?: true
    capacity?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    name?: true
    capacity?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    name: string
    capacity: number
    type: string
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    capacity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    schedules?: boolean | Room$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | Room$scheduleRulesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    capacity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    capacity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    name?: boolean
    capacity?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "capacity" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | Room$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | Room$scheduleRulesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      scheduleRules: Prisma.$ScheduleRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      capacity: number
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedules<T extends Room$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Room$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scheduleRules<T extends Room$scheduleRulesArgs<ExtArgs> = {}>(args?: Subset<T, Room$scheduleRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly capacity: FieldRef<"Room", 'Int'>
    readonly type: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.schedules
   */
  export type Room$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Room.scheduleRules
   */
  export type Room$scheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    cursor?: ScheduleRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    name: number
    code: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    name: string
    code: string
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curriculums?: boolean | Course$curriculumsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculums?: boolean | Course$curriculumsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      curriculums: Prisma.$CurriculumPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curriculums<T extends Course$curriculumsArgs<ExtArgs> = {}>(args?: Subset<T, Course$curriculumsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly code: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.curriculums
   */
  export type Course$curriculumsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    where?: CurriculumWhereInput
    orderBy?: CurriculumOrderByWithRelationInput | CurriculumOrderByWithRelationInput[]
    cursor?: CurriculumWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CurriculumScalarFieldEnum | CurriculumScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Curriculum
   */

  export type AggregateCurriculum = {
    _count: CurriculumCountAggregateOutputType | null
    _min: CurriculumMinAggregateOutputType | null
    _max: CurriculumMaxAggregateOutputType | null
  }

  export type CurriculumMinAggregateOutputType = {
    id: string | null
    name: string | null
    active: boolean | null
    courseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CurriculumMaxAggregateOutputType = {
    id: string | null
    name: string | null
    active: boolean | null
    courseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CurriculumCountAggregateOutputType = {
    id: number
    name: number
    active: number
    courseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CurriculumMinAggregateInputType = {
    id?: true
    name?: true
    active?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CurriculumMaxAggregateInputType = {
    id?: true
    name?: true
    active?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CurriculumCountAggregateInputType = {
    id?: true
    name?: true
    active?: true
    courseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CurriculumAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Curriculum to aggregate.
     */
    where?: CurriculumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Curricula to fetch.
     */
    orderBy?: CurriculumOrderByWithRelationInput | CurriculumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CurriculumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Curricula from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Curricula.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Curricula
    **/
    _count?: true | CurriculumCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CurriculumMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CurriculumMaxAggregateInputType
  }

  export type GetCurriculumAggregateType<T extends CurriculumAggregateArgs> = {
        [P in keyof T & keyof AggregateCurriculum]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurriculum[P]>
      : GetScalarType<T[P], AggregateCurriculum[P]>
  }




  export type CurriculumGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurriculumWhereInput
    orderBy?: CurriculumOrderByWithAggregationInput | CurriculumOrderByWithAggregationInput[]
    by: CurriculumScalarFieldEnum[] | CurriculumScalarFieldEnum
    having?: CurriculumScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CurriculumCountAggregateInputType | true
    _min?: CurriculumMinAggregateInputType
    _max?: CurriculumMaxAggregateInputType
  }

  export type CurriculumGroupByOutputType = {
    id: string
    name: string
    active: boolean
    courseId: string
    createdAt: Date
    updatedAt: Date
    _count: CurriculumCountAggregateOutputType | null
    _min: CurriculumMinAggregateOutputType | null
    _max: CurriculumMaxAggregateOutputType | null
  }

  type GetCurriculumGroupByPayload<T extends CurriculumGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CurriculumGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CurriculumGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CurriculumGroupByOutputType[P]>
            : GetScalarType<T[P], CurriculumGroupByOutputType[P]>
        }
      >
    >


  export type CurriculumSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    active?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    subjects?: boolean | Curriculum$subjectsArgs<ExtArgs>
    classGroups?: boolean | Curriculum$classGroupsArgs<ExtArgs>
    _count?: boolean | CurriculumCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curriculum"]>

  export type CurriculumSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    active?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curriculum"]>

  export type CurriculumSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    active?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curriculum"]>

  export type CurriculumSelectScalar = {
    id?: boolean
    name?: boolean
    active?: boolean
    courseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CurriculumOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "active" | "courseId" | "createdAt" | "updatedAt", ExtArgs["result"]["curriculum"]>
  export type CurriculumInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    subjects?: boolean | Curriculum$subjectsArgs<ExtArgs>
    classGroups?: boolean | Curriculum$classGroupsArgs<ExtArgs>
    _count?: boolean | CurriculumCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CurriculumIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type CurriculumIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $CurriculumPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Curriculum"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      subjects: Prisma.$CurriculumSubjectPayload<ExtArgs>[]
      classGroups: Prisma.$ClassGroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      active: boolean
      courseId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["curriculum"]>
    composites: {}
  }

  type CurriculumGetPayload<S extends boolean | null | undefined | CurriculumDefaultArgs> = $Result.GetResult<Prisma.$CurriculumPayload, S>

  type CurriculumCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CurriculumFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CurriculumCountAggregateInputType | true
    }

  export interface CurriculumDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Curriculum'], meta: { name: 'Curriculum' } }
    /**
     * Find zero or one Curriculum that matches the filter.
     * @param {CurriculumFindUniqueArgs} args - Arguments to find a Curriculum
     * @example
     * // Get one Curriculum
     * const curriculum = await prisma.curriculum.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CurriculumFindUniqueArgs>(args: SelectSubset<T, CurriculumFindUniqueArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Curriculum that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CurriculumFindUniqueOrThrowArgs} args - Arguments to find a Curriculum
     * @example
     * // Get one Curriculum
     * const curriculum = await prisma.curriculum.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CurriculumFindUniqueOrThrowArgs>(args: SelectSubset<T, CurriculumFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Curriculum that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumFindFirstArgs} args - Arguments to find a Curriculum
     * @example
     * // Get one Curriculum
     * const curriculum = await prisma.curriculum.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CurriculumFindFirstArgs>(args?: SelectSubset<T, CurriculumFindFirstArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Curriculum that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumFindFirstOrThrowArgs} args - Arguments to find a Curriculum
     * @example
     * // Get one Curriculum
     * const curriculum = await prisma.curriculum.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CurriculumFindFirstOrThrowArgs>(args?: SelectSubset<T, CurriculumFindFirstOrThrowArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Curricula that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Curricula
     * const curricula = await prisma.curriculum.findMany()
     * 
     * // Get first 10 Curricula
     * const curricula = await prisma.curriculum.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const curriculumWithIdOnly = await prisma.curriculum.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CurriculumFindManyArgs>(args?: SelectSubset<T, CurriculumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Curriculum.
     * @param {CurriculumCreateArgs} args - Arguments to create a Curriculum.
     * @example
     * // Create one Curriculum
     * const Curriculum = await prisma.curriculum.create({
     *   data: {
     *     // ... data to create a Curriculum
     *   }
     * })
     * 
     */
    create<T extends CurriculumCreateArgs>(args: SelectSubset<T, CurriculumCreateArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Curricula.
     * @param {CurriculumCreateManyArgs} args - Arguments to create many Curricula.
     * @example
     * // Create many Curricula
     * const curriculum = await prisma.curriculum.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CurriculumCreateManyArgs>(args?: SelectSubset<T, CurriculumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Curricula and returns the data saved in the database.
     * @param {CurriculumCreateManyAndReturnArgs} args - Arguments to create many Curricula.
     * @example
     * // Create many Curricula
     * const curriculum = await prisma.curriculum.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Curricula and only return the `id`
     * const curriculumWithIdOnly = await prisma.curriculum.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CurriculumCreateManyAndReturnArgs>(args?: SelectSubset<T, CurriculumCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Curriculum.
     * @param {CurriculumDeleteArgs} args - Arguments to delete one Curriculum.
     * @example
     * // Delete one Curriculum
     * const Curriculum = await prisma.curriculum.delete({
     *   where: {
     *     // ... filter to delete one Curriculum
     *   }
     * })
     * 
     */
    delete<T extends CurriculumDeleteArgs>(args: SelectSubset<T, CurriculumDeleteArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Curriculum.
     * @param {CurriculumUpdateArgs} args - Arguments to update one Curriculum.
     * @example
     * // Update one Curriculum
     * const curriculum = await prisma.curriculum.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CurriculumUpdateArgs>(args: SelectSubset<T, CurriculumUpdateArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Curricula.
     * @param {CurriculumDeleteManyArgs} args - Arguments to filter Curricula to delete.
     * @example
     * // Delete a few Curricula
     * const { count } = await prisma.curriculum.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CurriculumDeleteManyArgs>(args?: SelectSubset<T, CurriculumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Curricula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Curricula
     * const curriculum = await prisma.curriculum.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CurriculumUpdateManyArgs>(args: SelectSubset<T, CurriculumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Curricula and returns the data updated in the database.
     * @param {CurriculumUpdateManyAndReturnArgs} args - Arguments to update many Curricula.
     * @example
     * // Update many Curricula
     * const curriculum = await prisma.curriculum.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Curricula and only return the `id`
     * const curriculumWithIdOnly = await prisma.curriculum.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CurriculumUpdateManyAndReturnArgs>(args: SelectSubset<T, CurriculumUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Curriculum.
     * @param {CurriculumUpsertArgs} args - Arguments to update or create a Curriculum.
     * @example
     * // Update or create a Curriculum
     * const curriculum = await prisma.curriculum.upsert({
     *   create: {
     *     // ... data to create a Curriculum
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Curriculum we want to update
     *   }
     * })
     */
    upsert<T extends CurriculumUpsertArgs>(args: SelectSubset<T, CurriculumUpsertArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Curricula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumCountArgs} args - Arguments to filter Curricula to count.
     * @example
     * // Count the number of Curricula
     * const count = await prisma.curriculum.count({
     *   where: {
     *     // ... the filter for the Curricula we want to count
     *   }
     * })
    **/
    count<T extends CurriculumCountArgs>(
      args?: Subset<T, CurriculumCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CurriculumCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Curriculum.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CurriculumAggregateArgs>(args: Subset<T, CurriculumAggregateArgs>): Prisma.PrismaPromise<GetCurriculumAggregateType<T>>

    /**
     * Group by Curriculum.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CurriculumGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CurriculumGroupByArgs['orderBy'] }
        : { orderBy?: CurriculumGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CurriculumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCurriculumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Curriculum model
   */
  readonly fields: CurriculumFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Curriculum.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CurriculumClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subjects<T extends Curriculum$subjectsArgs<ExtArgs> = {}>(args?: Subset<T, Curriculum$subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    classGroups<T extends Curriculum$classGroupsArgs<ExtArgs> = {}>(args?: Subset<T, Curriculum$classGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Curriculum model
   */
  interface CurriculumFieldRefs {
    readonly id: FieldRef<"Curriculum", 'String'>
    readonly name: FieldRef<"Curriculum", 'String'>
    readonly active: FieldRef<"Curriculum", 'Boolean'>
    readonly courseId: FieldRef<"Curriculum", 'String'>
    readonly createdAt: FieldRef<"Curriculum", 'DateTime'>
    readonly updatedAt: FieldRef<"Curriculum", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Curriculum findUnique
   */
  export type CurriculumFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * Filter, which Curriculum to fetch.
     */
    where: CurriculumWhereUniqueInput
  }

  /**
   * Curriculum findUniqueOrThrow
   */
  export type CurriculumFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * Filter, which Curriculum to fetch.
     */
    where: CurriculumWhereUniqueInput
  }

  /**
   * Curriculum findFirst
   */
  export type CurriculumFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * Filter, which Curriculum to fetch.
     */
    where?: CurriculumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Curricula to fetch.
     */
    orderBy?: CurriculumOrderByWithRelationInput | CurriculumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Curricula.
     */
    cursor?: CurriculumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Curricula from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Curricula.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Curricula.
     */
    distinct?: CurriculumScalarFieldEnum | CurriculumScalarFieldEnum[]
  }

  /**
   * Curriculum findFirstOrThrow
   */
  export type CurriculumFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * Filter, which Curriculum to fetch.
     */
    where?: CurriculumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Curricula to fetch.
     */
    orderBy?: CurriculumOrderByWithRelationInput | CurriculumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Curricula.
     */
    cursor?: CurriculumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Curricula from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Curricula.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Curricula.
     */
    distinct?: CurriculumScalarFieldEnum | CurriculumScalarFieldEnum[]
  }

  /**
   * Curriculum findMany
   */
  export type CurriculumFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * Filter, which Curricula to fetch.
     */
    where?: CurriculumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Curricula to fetch.
     */
    orderBy?: CurriculumOrderByWithRelationInput | CurriculumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Curricula.
     */
    cursor?: CurriculumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Curricula from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Curricula.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Curricula.
     */
    distinct?: CurriculumScalarFieldEnum | CurriculumScalarFieldEnum[]
  }

  /**
   * Curriculum create
   */
  export type CurriculumCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * The data needed to create a Curriculum.
     */
    data: XOR<CurriculumCreateInput, CurriculumUncheckedCreateInput>
  }

  /**
   * Curriculum createMany
   */
  export type CurriculumCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Curricula.
     */
    data: CurriculumCreateManyInput | CurriculumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Curriculum createManyAndReturn
   */
  export type CurriculumCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * The data used to create many Curricula.
     */
    data: CurriculumCreateManyInput | CurriculumCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Curriculum update
   */
  export type CurriculumUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * The data needed to update a Curriculum.
     */
    data: XOR<CurriculumUpdateInput, CurriculumUncheckedUpdateInput>
    /**
     * Choose, which Curriculum to update.
     */
    where: CurriculumWhereUniqueInput
  }

  /**
   * Curriculum updateMany
   */
  export type CurriculumUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Curricula.
     */
    data: XOR<CurriculumUpdateManyMutationInput, CurriculumUncheckedUpdateManyInput>
    /**
     * Filter which Curricula to update
     */
    where?: CurriculumWhereInput
    /**
     * Limit how many Curricula to update.
     */
    limit?: number
  }

  /**
   * Curriculum updateManyAndReturn
   */
  export type CurriculumUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * The data used to update Curricula.
     */
    data: XOR<CurriculumUpdateManyMutationInput, CurriculumUncheckedUpdateManyInput>
    /**
     * Filter which Curricula to update
     */
    where?: CurriculumWhereInput
    /**
     * Limit how many Curricula to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Curriculum upsert
   */
  export type CurriculumUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * The filter to search for the Curriculum to update in case it exists.
     */
    where: CurriculumWhereUniqueInput
    /**
     * In case the Curriculum found by the `where` argument doesn't exist, create a new Curriculum with this data.
     */
    create: XOR<CurriculumCreateInput, CurriculumUncheckedCreateInput>
    /**
     * In case the Curriculum was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CurriculumUpdateInput, CurriculumUncheckedUpdateInput>
  }

  /**
   * Curriculum delete
   */
  export type CurriculumDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
    /**
     * Filter which Curriculum to delete.
     */
    where: CurriculumWhereUniqueInput
  }

  /**
   * Curriculum deleteMany
   */
  export type CurriculumDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Curricula to delete
     */
    where?: CurriculumWhereInput
    /**
     * Limit how many Curricula to delete.
     */
    limit?: number
  }

  /**
   * Curriculum.subjects
   */
  export type Curriculum$subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    where?: CurriculumSubjectWhereInput
    orderBy?: CurriculumSubjectOrderByWithRelationInput | CurriculumSubjectOrderByWithRelationInput[]
    cursor?: CurriculumSubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CurriculumSubjectScalarFieldEnum | CurriculumSubjectScalarFieldEnum[]
  }

  /**
   * Curriculum.classGroups
   */
  export type Curriculum$classGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    where?: ClassGroupWhereInput
    orderBy?: ClassGroupOrderByWithRelationInput | ClassGroupOrderByWithRelationInput[]
    cursor?: ClassGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassGroupScalarFieldEnum | ClassGroupScalarFieldEnum[]
  }

  /**
   * Curriculum without action
   */
  export type CurriculumDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Curriculum
     */
    select?: CurriculumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Curriculum
     */
    omit?: CurriculumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectAvgAggregateOutputType = {
    hours: number | null
  }

  export type SubjectSumAggregateOutputType = {
    hours: number | null
  }

  export type SubjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    hours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    hours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    name: number
    code: number
    hours: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubjectAvgAggregateInputType = {
    hours?: true
  }

  export type SubjectSumAggregateInputType = {
    hours?: true
  }

  export type SubjectMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    hours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    hours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    hours?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _avg?: SubjectAvgAggregateInputType
    _sum?: SubjectSumAggregateInputType
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: string
    name: string
    code: string
    hours: number
    createdAt: Date
    updatedAt: Date
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    hours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curriculums?: boolean | Subject$curriculumsArgs<ExtArgs>
    schedules?: boolean | Subject$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | Subject$scheduleRulesArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    hours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    hours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    hours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "hours" | "createdAt" | "updatedAt", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculums?: boolean | Subject$curriculumsArgs<ExtArgs>
    schedules?: boolean | Subject$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | Subject$scheduleRulesArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      curriculums: Prisma.$CurriculumSubjectPayload<ExtArgs>[]
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      scheduleRules: Prisma.$ScheduleRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      hours: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curriculums<T extends Subject$curriculumsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$curriculumsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    schedules<T extends Subject$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scheduleRules<T extends Subject$scheduleRulesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$scheduleRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'String'>
    readonly name: FieldRef<"Subject", 'String'>
    readonly code: FieldRef<"Subject", 'String'>
    readonly hours: FieldRef<"Subject", 'Int'>
    readonly createdAt: FieldRef<"Subject", 'DateTime'>
    readonly updatedAt: FieldRef<"Subject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.curriculums
   */
  export type Subject$curriculumsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    where?: CurriculumSubjectWhereInput
    orderBy?: CurriculumSubjectOrderByWithRelationInput | CurriculumSubjectOrderByWithRelationInput[]
    cursor?: CurriculumSubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CurriculumSubjectScalarFieldEnum | CurriculumSubjectScalarFieldEnum[]
  }

  /**
   * Subject.schedules
   */
  export type Subject$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Subject.scheduleRules
   */
  export type Subject$scheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    cursor?: ScheduleRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model CurriculumSubject
   */

  export type AggregateCurriculumSubject = {
    _count: CurriculumSubjectCountAggregateOutputType | null
    _avg: CurriculumSubjectAvgAggregateOutputType | null
    _sum: CurriculumSubjectSumAggregateOutputType | null
    _min: CurriculumSubjectMinAggregateOutputType | null
    _max: CurriculumSubjectMaxAggregateOutputType | null
  }

  export type CurriculumSubjectAvgAggregateOutputType = {
    module: number | null
  }

  export type CurriculumSubjectSumAggregateOutputType = {
    module: number | null
  }

  export type CurriculumSubjectMinAggregateOutputType = {
    curriculumId: string | null
    subjectId: string | null
    module: number | null
  }

  export type CurriculumSubjectMaxAggregateOutputType = {
    curriculumId: string | null
    subjectId: string | null
    module: number | null
  }

  export type CurriculumSubjectCountAggregateOutputType = {
    curriculumId: number
    subjectId: number
    module: number
    _all: number
  }


  export type CurriculumSubjectAvgAggregateInputType = {
    module?: true
  }

  export type CurriculumSubjectSumAggregateInputType = {
    module?: true
  }

  export type CurriculumSubjectMinAggregateInputType = {
    curriculumId?: true
    subjectId?: true
    module?: true
  }

  export type CurriculumSubjectMaxAggregateInputType = {
    curriculumId?: true
    subjectId?: true
    module?: true
  }

  export type CurriculumSubjectCountAggregateInputType = {
    curriculumId?: true
    subjectId?: true
    module?: true
    _all?: true
  }

  export type CurriculumSubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CurriculumSubject to aggregate.
     */
    where?: CurriculumSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurriculumSubjects to fetch.
     */
    orderBy?: CurriculumSubjectOrderByWithRelationInput | CurriculumSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CurriculumSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurriculumSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurriculumSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CurriculumSubjects
    **/
    _count?: true | CurriculumSubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CurriculumSubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CurriculumSubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CurriculumSubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CurriculumSubjectMaxAggregateInputType
  }

  export type GetCurriculumSubjectAggregateType<T extends CurriculumSubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateCurriculumSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCurriculumSubject[P]>
      : GetScalarType<T[P], AggregateCurriculumSubject[P]>
  }




  export type CurriculumSubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CurriculumSubjectWhereInput
    orderBy?: CurriculumSubjectOrderByWithAggregationInput | CurriculumSubjectOrderByWithAggregationInput[]
    by: CurriculumSubjectScalarFieldEnum[] | CurriculumSubjectScalarFieldEnum
    having?: CurriculumSubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CurriculumSubjectCountAggregateInputType | true
    _avg?: CurriculumSubjectAvgAggregateInputType
    _sum?: CurriculumSubjectSumAggregateInputType
    _min?: CurriculumSubjectMinAggregateInputType
    _max?: CurriculumSubjectMaxAggregateInputType
  }

  export type CurriculumSubjectGroupByOutputType = {
    curriculumId: string
    subjectId: string
    module: number
    _count: CurriculumSubjectCountAggregateOutputType | null
    _avg: CurriculumSubjectAvgAggregateOutputType | null
    _sum: CurriculumSubjectSumAggregateOutputType | null
    _min: CurriculumSubjectMinAggregateOutputType | null
    _max: CurriculumSubjectMaxAggregateOutputType | null
  }

  type GetCurriculumSubjectGroupByPayload<T extends CurriculumSubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CurriculumSubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CurriculumSubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CurriculumSubjectGroupByOutputType[P]>
            : GetScalarType<T[P], CurriculumSubjectGroupByOutputType[P]>
        }
      >
    >


  export type CurriculumSubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    curriculumId?: boolean
    subjectId?: boolean
    module?: boolean
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curriculumSubject"]>

  export type CurriculumSubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    curriculumId?: boolean
    subjectId?: boolean
    module?: boolean
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curriculumSubject"]>

  export type CurriculumSubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    curriculumId?: boolean
    subjectId?: boolean
    module?: boolean
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["curriculumSubject"]>

  export type CurriculumSubjectSelectScalar = {
    curriculumId?: boolean
    subjectId?: boolean
    module?: boolean
  }

  export type CurriculumSubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"curriculumId" | "subjectId" | "module", ExtArgs["result"]["curriculumSubject"]>
  export type CurriculumSubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type CurriculumSubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type CurriculumSubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $CurriculumSubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CurriculumSubject"
    objects: {
      curriculum: Prisma.$CurriculumPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      curriculumId: string
      subjectId: string
      module: number
    }, ExtArgs["result"]["curriculumSubject"]>
    composites: {}
  }

  type CurriculumSubjectGetPayload<S extends boolean | null | undefined | CurriculumSubjectDefaultArgs> = $Result.GetResult<Prisma.$CurriculumSubjectPayload, S>

  type CurriculumSubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CurriculumSubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CurriculumSubjectCountAggregateInputType | true
    }

  export interface CurriculumSubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CurriculumSubject'], meta: { name: 'CurriculumSubject' } }
    /**
     * Find zero or one CurriculumSubject that matches the filter.
     * @param {CurriculumSubjectFindUniqueArgs} args - Arguments to find a CurriculumSubject
     * @example
     * // Get one CurriculumSubject
     * const curriculumSubject = await prisma.curriculumSubject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CurriculumSubjectFindUniqueArgs>(args: SelectSubset<T, CurriculumSubjectFindUniqueArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CurriculumSubject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CurriculumSubjectFindUniqueOrThrowArgs} args - Arguments to find a CurriculumSubject
     * @example
     * // Get one CurriculumSubject
     * const curriculumSubject = await prisma.curriculumSubject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CurriculumSubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, CurriculumSubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CurriculumSubject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectFindFirstArgs} args - Arguments to find a CurriculumSubject
     * @example
     * // Get one CurriculumSubject
     * const curriculumSubject = await prisma.curriculumSubject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CurriculumSubjectFindFirstArgs>(args?: SelectSubset<T, CurriculumSubjectFindFirstArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CurriculumSubject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectFindFirstOrThrowArgs} args - Arguments to find a CurriculumSubject
     * @example
     * // Get one CurriculumSubject
     * const curriculumSubject = await prisma.curriculumSubject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CurriculumSubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, CurriculumSubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CurriculumSubjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CurriculumSubjects
     * const curriculumSubjects = await prisma.curriculumSubject.findMany()
     * 
     * // Get first 10 CurriculumSubjects
     * const curriculumSubjects = await prisma.curriculumSubject.findMany({ take: 10 })
     * 
     * // Only select the `curriculumId`
     * const curriculumSubjectWithCurriculumIdOnly = await prisma.curriculumSubject.findMany({ select: { curriculumId: true } })
     * 
     */
    findMany<T extends CurriculumSubjectFindManyArgs>(args?: SelectSubset<T, CurriculumSubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CurriculumSubject.
     * @param {CurriculumSubjectCreateArgs} args - Arguments to create a CurriculumSubject.
     * @example
     * // Create one CurriculumSubject
     * const CurriculumSubject = await prisma.curriculumSubject.create({
     *   data: {
     *     // ... data to create a CurriculumSubject
     *   }
     * })
     * 
     */
    create<T extends CurriculumSubjectCreateArgs>(args: SelectSubset<T, CurriculumSubjectCreateArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CurriculumSubjects.
     * @param {CurriculumSubjectCreateManyArgs} args - Arguments to create many CurriculumSubjects.
     * @example
     * // Create many CurriculumSubjects
     * const curriculumSubject = await prisma.curriculumSubject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CurriculumSubjectCreateManyArgs>(args?: SelectSubset<T, CurriculumSubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CurriculumSubjects and returns the data saved in the database.
     * @param {CurriculumSubjectCreateManyAndReturnArgs} args - Arguments to create many CurriculumSubjects.
     * @example
     * // Create many CurriculumSubjects
     * const curriculumSubject = await prisma.curriculumSubject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CurriculumSubjects and only return the `curriculumId`
     * const curriculumSubjectWithCurriculumIdOnly = await prisma.curriculumSubject.createManyAndReturn({
     *   select: { curriculumId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CurriculumSubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, CurriculumSubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CurriculumSubject.
     * @param {CurriculumSubjectDeleteArgs} args - Arguments to delete one CurriculumSubject.
     * @example
     * // Delete one CurriculumSubject
     * const CurriculumSubject = await prisma.curriculumSubject.delete({
     *   where: {
     *     // ... filter to delete one CurriculumSubject
     *   }
     * })
     * 
     */
    delete<T extends CurriculumSubjectDeleteArgs>(args: SelectSubset<T, CurriculumSubjectDeleteArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CurriculumSubject.
     * @param {CurriculumSubjectUpdateArgs} args - Arguments to update one CurriculumSubject.
     * @example
     * // Update one CurriculumSubject
     * const curriculumSubject = await prisma.curriculumSubject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CurriculumSubjectUpdateArgs>(args: SelectSubset<T, CurriculumSubjectUpdateArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CurriculumSubjects.
     * @param {CurriculumSubjectDeleteManyArgs} args - Arguments to filter CurriculumSubjects to delete.
     * @example
     * // Delete a few CurriculumSubjects
     * const { count } = await prisma.curriculumSubject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CurriculumSubjectDeleteManyArgs>(args?: SelectSubset<T, CurriculumSubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CurriculumSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CurriculumSubjects
     * const curriculumSubject = await prisma.curriculumSubject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CurriculumSubjectUpdateManyArgs>(args: SelectSubset<T, CurriculumSubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CurriculumSubjects and returns the data updated in the database.
     * @param {CurriculumSubjectUpdateManyAndReturnArgs} args - Arguments to update many CurriculumSubjects.
     * @example
     * // Update many CurriculumSubjects
     * const curriculumSubject = await prisma.curriculumSubject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CurriculumSubjects and only return the `curriculumId`
     * const curriculumSubjectWithCurriculumIdOnly = await prisma.curriculumSubject.updateManyAndReturn({
     *   select: { curriculumId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CurriculumSubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, CurriculumSubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CurriculumSubject.
     * @param {CurriculumSubjectUpsertArgs} args - Arguments to update or create a CurriculumSubject.
     * @example
     * // Update or create a CurriculumSubject
     * const curriculumSubject = await prisma.curriculumSubject.upsert({
     *   create: {
     *     // ... data to create a CurriculumSubject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CurriculumSubject we want to update
     *   }
     * })
     */
    upsert<T extends CurriculumSubjectUpsertArgs>(args: SelectSubset<T, CurriculumSubjectUpsertArgs<ExtArgs>>): Prisma__CurriculumSubjectClient<$Result.GetResult<Prisma.$CurriculumSubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CurriculumSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectCountArgs} args - Arguments to filter CurriculumSubjects to count.
     * @example
     * // Count the number of CurriculumSubjects
     * const count = await prisma.curriculumSubject.count({
     *   where: {
     *     // ... the filter for the CurriculumSubjects we want to count
     *   }
     * })
    **/
    count<T extends CurriculumSubjectCountArgs>(
      args?: Subset<T, CurriculumSubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CurriculumSubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CurriculumSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CurriculumSubjectAggregateArgs>(args: Subset<T, CurriculumSubjectAggregateArgs>): Prisma.PrismaPromise<GetCurriculumSubjectAggregateType<T>>

    /**
     * Group by CurriculumSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CurriculumSubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CurriculumSubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CurriculumSubjectGroupByArgs['orderBy'] }
        : { orderBy?: CurriculumSubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CurriculumSubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCurriculumSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CurriculumSubject model
   */
  readonly fields: CurriculumSubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CurriculumSubject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CurriculumSubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curriculum<T extends CurriculumDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CurriculumDefaultArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CurriculumSubject model
   */
  interface CurriculumSubjectFieldRefs {
    readonly curriculumId: FieldRef<"CurriculumSubject", 'String'>
    readonly subjectId: FieldRef<"CurriculumSubject", 'String'>
    readonly module: FieldRef<"CurriculumSubject", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CurriculumSubject findUnique
   */
  export type CurriculumSubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CurriculumSubject to fetch.
     */
    where: CurriculumSubjectWhereUniqueInput
  }

  /**
   * CurriculumSubject findUniqueOrThrow
   */
  export type CurriculumSubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CurriculumSubject to fetch.
     */
    where: CurriculumSubjectWhereUniqueInput
  }

  /**
   * CurriculumSubject findFirst
   */
  export type CurriculumSubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CurriculumSubject to fetch.
     */
    where?: CurriculumSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurriculumSubjects to fetch.
     */
    orderBy?: CurriculumSubjectOrderByWithRelationInput | CurriculumSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CurriculumSubjects.
     */
    cursor?: CurriculumSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurriculumSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurriculumSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurriculumSubjects.
     */
    distinct?: CurriculumSubjectScalarFieldEnum | CurriculumSubjectScalarFieldEnum[]
  }

  /**
   * CurriculumSubject findFirstOrThrow
   */
  export type CurriculumSubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CurriculumSubject to fetch.
     */
    where?: CurriculumSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurriculumSubjects to fetch.
     */
    orderBy?: CurriculumSubjectOrderByWithRelationInput | CurriculumSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CurriculumSubjects.
     */
    cursor?: CurriculumSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurriculumSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurriculumSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurriculumSubjects.
     */
    distinct?: CurriculumSubjectScalarFieldEnum | CurriculumSubjectScalarFieldEnum[]
  }

  /**
   * CurriculumSubject findMany
   */
  export type CurriculumSubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * Filter, which CurriculumSubjects to fetch.
     */
    where?: CurriculumSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CurriculumSubjects to fetch.
     */
    orderBy?: CurriculumSubjectOrderByWithRelationInput | CurriculumSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CurriculumSubjects.
     */
    cursor?: CurriculumSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CurriculumSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CurriculumSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CurriculumSubjects.
     */
    distinct?: CurriculumSubjectScalarFieldEnum | CurriculumSubjectScalarFieldEnum[]
  }

  /**
   * CurriculumSubject create
   */
  export type CurriculumSubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a CurriculumSubject.
     */
    data: XOR<CurriculumSubjectCreateInput, CurriculumSubjectUncheckedCreateInput>
  }

  /**
   * CurriculumSubject createMany
   */
  export type CurriculumSubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CurriculumSubjects.
     */
    data: CurriculumSubjectCreateManyInput | CurriculumSubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CurriculumSubject createManyAndReturn
   */
  export type CurriculumSubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * The data used to create many CurriculumSubjects.
     */
    data: CurriculumSubjectCreateManyInput | CurriculumSubjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CurriculumSubject update
   */
  export type CurriculumSubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a CurriculumSubject.
     */
    data: XOR<CurriculumSubjectUpdateInput, CurriculumSubjectUncheckedUpdateInput>
    /**
     * Choose, which CurriculumSubject to update.
     */
    where: CurriculumSubjectWhereUniqueInput
  }

  /**
   * CurriculumSubject updateMany
   */
  export type CurriculumSubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CurriculumSubjects.
     */
    data: XOR<CurriculumSubjectUpdateManyMutationInput, CurriculumSubjectUncheckedUpdateManyInput>
    /**
     * Filter which CurriculumSubjects to update
     */
    where?: CurriculumSubjectWhereInput
    /**
     * Limit how many CurriculumSubjects to update.
     */
    limit?: number
  }

  /**
   * CurriculumSubject updateManyAndReturn
   */
  export type CurriculumSubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * The data used to update CurriculumSubjects.
     */
    data: XOR<CurriculumSubjectUpdateManyMutationInput, CurriculumSubjectUncheckedUpdateManyInput>
    /**
     * Filter which CurriculumSubjects to update
     */
    where?: CurriculumSubjectWhereInput
    /**
     * Limit how many CurriculumSubjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CurriculumSubject upsert
   */
  export type CurriculumSubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the CurriculumSubject to update in case it exists.
     */
    where: CurriculumSubjectWhereUniqueInput
    /**
     * In case the CurriculumSubject found by the `where` argument doesn't exist, create a new CurriculumSubject with this data.
     */
    create: XOR<CurriculumSubjectCreateInput, CurriculumSubjectUncheckedCreateInput>
    /**
     * In case the CurriculumSubject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CurriculumSubjectUpdateInput, CurriculumSubjectUncheckedUpdateInput>
  }

  /**
   * CurriculumSubject delete
   */
  export type CurriculumSubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
    /**
     * Filter which CurriculumSubject to delete.
     */
    where: CurriculumSubjectWhereUniqueInput
  }

  /**
   * CurriculumSubject deleteMany
   */
  export type CurriculumSubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CurriculumSubjects to delete
     */
    where?: CurriculumSubjectWhereInput
    /**
     * Limit how many CurriculumSubjects to delete.
     */
    limit?: number
  }

  /**
   * CurriculumSubject without action
   */
  export type CurriculumSubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CurriculumSubject
     */
    select?: CurriculumSubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CurriculumSubject
     */
    omit?: CurriculumSubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CurriculumSubjectInclude<ExtArgs> | null
  }


  /**
   * Model ClassGroup
   */

  export type AggregateClassGroup = {
    _count: ClassGroupCountAggregateOutputType | null
    _min: ClassGroupMinAggregateOutputType | null
    _max: ClassGroupMaxAggregateOutputType | null
  }

  export type ClassGroupMinAggregateOutputType = {
    id: string | null
    code: string | null
    shift: string | null
    startDate: Date | null
    endDate: Date | null
    curriculumId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassGroupMaxAggregateOutputType = {
    id: string | null
    code: string | null
    shift: string | null
    startDate: Date | null
    endDate: Date | null
    curriculumId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassGroupCountAggregateOutputType = {
    id: number
    code: number
    shift: number
    startDate: number
    endDate: number
    curriculumId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClassGroupMinAggregateInputType = {
    id?: true
    code?: true
    shift?: true
    startDate?: true
    endDate?: true
    curriculumId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassGroupMaxAggregateInputType = {
    id?: true
    code?: true
    shift?: true
    startDate?: true
    endDate?: true
    curriculumId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassGroupCountAggregateInputType = {
    id?: true
    code?: true
    shift?: true
    startDate?: true
    endDate?: true
    curriculumId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClassGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassGroup to aggregate.
     */
    where?: ClassGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassGroups to fetch.
     */
    orderBy?: ClassGroupOrderByWithRelationInput | ClassGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClassGroups
    **/
    _count?: true | ClassGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassGroupMaxAggregateInputType
  }

  export type GetClassGroupAggregateType<T extends ClassGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateClassGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassGroup[P]>
      : GetScalarType<T[P], AggregateClassGroup[P]>
  }




  export type ClassGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassGroupWhereInput
    orderBy?: ClassGroupOrderByWithAggregationInput | ClassGroupOrderByWithAggregationInput[]
    by: ClassGroupScalarFieldEnum[] | ClassGroupScalarFieldEnum
    having?: ClassGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassGroupCountAggregateInputType | true
    _min?: ClassGroupMinAggregateInputType
    _max?: ClassGroupMaxAggregateInputType
  }

  export type ClassGroupGroupByOutputType = {
    id: string
    code: string
    shift: string
    startDate: Date
    endDate: Date | null
    curriculumId: string
    createdAt: Date
    updatedAt: Date
    _count: ClassGroupCountAggregateOutputType | null
    _min: ClassGroupMinAggregateOutputType | null
    _max: ClassGroupMaxAggregateOutputType | null
  }

  type GetClassGroupGroupByPayload<T extends ClassGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupGroupByOutputType[P]>
        }
      >
    >


  export type ClassGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    shift?: boolean
    startDate?: boolean
    endDate?: boolean
    curriculumId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    schedules?: boolean | ClassGroup$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | ClassGroup$scheduleRulesArgs<ExtArgs>
    _count?: boolean | ClassGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classGroup"]>

  export type ClassGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    shift?: boolean
    startDate?: boolean
    endDate?: boolean
    curriculumId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classGroup"]>

  export type ClassGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    shift?: boolean
    startDate?: boolean
    endDate?: boolean
    curriculumId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classGroup"]>

  export type ClassGroupSelectScalar = {
    id?: boolean
    code?: boolean
    shift?: boolean
    startDate?: boolean
    endDate?: boolean
    curriculumId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClassGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "shift" | "startDate" | "endDate" | "curriculumId" | "createdAt" | "updatedAt", ExtArgs["result"]["classGroup"]>
  export type ClassGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
    schedules?: boolean | ClassGroup$schedulesArgs<ExtArgs>
    scheduleRules?: boolean | ClassGroup$scheduleRulesArgs<ExtArgs>
    _count?: boolean | ClassGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
  }
  export type ClassGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    curriculum?: boolean | CurriculumDefaultArgs<ExtArgs>
  }

  export type $ClassGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClassGroup"
    objects: {
      curriculum: Prisma.$CurriculumPayload<ExtArgs>
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      scheduleRules: Prisma.$ScheduleRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      shift: string
      startDate: Date
      endDate: Date | null
      curriculumId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["classGroup"]>
    composites: {}
  }

  type ClassGroupGetPayload<S extends boolean | null | undefined | ClassGroupDefaultArgs> = $Result.GetResult<Prisma.$ClassGroupPayload, S>

  type ClassGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassGroupCountAggregateInputType | true
    }

  export interface ClassGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClassGroup'], meta: { name: 'ClassGroup' } }
    /**
     * Find zero or one ClassGroup that matches the filter.
     * @param {ClassGroupFindUniqueArgs} args - Arguments to find a ClassGroup
     * @example
     * // Get one ClassGroup
     * const classGroup = await prisma.classGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassGroupFindUniqueArgs>(args: SelectSubset<T, ClassGroupFindUniqueArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClassGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassGroupFindUniqueOrThrowArgs} args - Arguments to find a ClassGroup
     * @example
     * // Get one ClassGroup
     * const classGroup = await prisma.classGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClassGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupFindFirstArgs} args - Arguments to find a ClassGroup
     * @example
     * // Get one ClassGroup
     * const classGroup = await prisma.classGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassGroupFindFirstArgs>(args?: SelectSubset<T, ClassGroupFindFirstArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClassGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupFindFirstOrThrowArgs} args - Arguments to find a ClassGroup
     * @example
     * // Get one ClassGroup
     * const classGroup = await prisma.classGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClassGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClassGroups
     * const classGroups = await prisma.classGroup.findMany()
     * 
     * // Get first 10 ClassGroups
     * const classGroups = await prisma.classGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classGroupWithIdOnly = await prisma.classGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassGroupFindManyArgs>(args?: SelectSubset<T, ClassGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClassGroup.
     * @param {ClassGroupCreateArgs} args - Arguments to create a ClassGroup.
     * @example
     * // Create one ClassGroup
     * const ClassGroup = await prisma.classGroup.create({
     *   data: {
     *     // ... data to create a ClassGroup
     *   }
     * })
     * 
     */
    create<T extends ClassGroupCreateArgs>(args: SelectSubset<T, ClassGroupCreateArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClassGroups.
     * @param {ClassGroupCreateManyArgs} args - Arguments to create many ClassGroups.
     * @example
     * // Create many ClassGroups
     * const classGroup = await prisma.classGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassGroupCreateManyArgs>(args?: SelectSubset<T, ClassGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClassGroups and returns the data saved in the database.
     * @param {ClassGroupCreateManyAndReturnArgs} args - Arguments to create many ClassGroups.
     * @example
     * // Create many ClassGroups
     * const classGroup = await prisma.classGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClassGroups and only return the `id`
     * const classGroupWithIdOnly = await prisma.classGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClassGroup.
     * @param {ClassGroupDeleteArgs} args - Arguments to delete one ClassGroup.
     * @example
     * // Delete one ClassGroup
     * const ClassGroup = await prisma.classGroup.delete({
     *   where: {
     *     // ... filter to delete one ClassGroup
     *   }
     * })
     * 
     */
    delete<T extends ClassGroupDeleteArgs>(args: SelectSubset<T, ClassGroupDeleteArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClassGroup.
     * @param {ClassGroupUpdateArgs} args - Arguments to update one ClassGroup.
     * @example
     * // Update one ClassGroup
     * const classGroup = await prisma.classGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassGroupUpdateArgs>(args: SelectSubset<T, ClassGroupUpdateArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClassGroups.
     * @param {ClassGroupDeleteManyArgs} args - Arguments to filter ClassGroups to delete.
     * @example
     * // Delete a few ClassGroups
     * const { count } = await prisma.classGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassGroupDeleteManyArgs>(args?: SelectSubset<T, ClassGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClassGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClassGroups
     * const classGroup = await prisma.classGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassGroupUpdateManyArgs>(args: SelectSubset<T, ClassGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClassGroups and returns the data updated in the database.
     * @param {ClassGroupUpdateManyAndReturnArgs} args - Arguments to update many ClassGroups.
     * @example
     * // Update many ClassGroups
     * const classGroup = await prisma.classGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClassGroups and only return the `id`
     * const classGroupWithIdOnly = await prisma.classGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClassGroup.
     * @param {ClassGroupUpsertArgs} args - Arguments to update or create a ClassGroup.
     * @example
     * // Update or create a ClassGroup
     * const classGroup = await prisma.classGroup.upsert({
     *   create: {
     *     // ... data to create a ClassGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClassGroup we want to update
     *   }
     * })
     */
    upsert<T extends ClassGroupUpsertArgs>(args: SelectSubset<T, ClassGroupUpsertArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClassGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupCountArgs} args - Arguments to filter ClassGroups to count.
     * @example
     * // Count the number of ClassGroups
     * const count = await prisma.classGroup.count({
     *   where: {
     *     // ... the filter for the ClassGroups we want to count
     *   }
     * })
    **/
    count<T extends ClassGroupCountArgs>(
      args?: Subset<T, ClassGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClassGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassGroupAggregateArgs>(args: Subset<T, ClassGroupAggregateArgs>): Prisma.PrismaPromise<GetClassGroupAggregateType<T>>

    /**
     * Group by ClassGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClassGroup model
   */
  readonly fields: ClassGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClassGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    curriculum<T extends CurriculumDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CurriculumDefaultArgs<ExtArgs>>): Prisma__CurriculumClient<$Result.GetResult<Prisma.$CurriculumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedules<T extends ClassGroup$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, ClassGroup$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scheduleRules<T extends ClassGroup$scheduleRulesArgs<ExtArgs> = {}>(args?: Subset<T, ClassGroup$scheduleRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClassGroup model
   */
  interface ClassGroupFieldRefs {
    readonly id: FieldRef<"ClassGroup", 'String'>
    readonly code: FieldRef<"ClassGroup", 'String'>
    readonly shift: FieldRef<"ClassGroup", 'String'>
    readonly startDate: FieldRef<"ClassGroup", 'DateTime'>
    readonly endDate: FieldRef<"ClassGroup", 'DateTime'>
    readonly curriculumId: FieldRef<"ClassGroup", 'String'>
    readonly createdAt: FieldRef<"ClassGroup", 'DateTime'>
    readonly updatedAt: FieldRef<"ClassGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClassGroup findUnique
   */
  export type ClassGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * Filter, which ClassGroup to fetch.
     */
    where: ClassGroupWhereUniqueInput
  }

  /**
   * ClassGroup findUniqueOrThrow
   */
  export type ClassGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * Filter, which ClassGroup to fetch.
     */
    where: ClassGroupWhereUniqueInput
  }

  /**
   * ClassGroup findFirst
   */
  export type ClassGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * Filter, which ClassGroup to fetch.
     */
    where?: ClassGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassGroups to fetch.
     */
    orderBy?: ClassGroupOrderByWithRelationInput | ClassGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassGroups.
     */
    cursor?: ClassGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassGroups.
     */
    distinct?: ClassGroupScalarFieldEnum | ClassGroupScalarFieldEnum[]
  }

  /**
   * ClassGroup findFirstOrThrow
   */
  export type ClassGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * Filter, which ClassGroup to fetch.
     */
    where?: ClassGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassGroups to fetch.
     */
    orderBy?: ClassGroupOrderByWithRelationInput | ClassGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassGroups.
     */
    cursor?: ClassGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassGroups.
     */
    distinct?: ClassGroupScalarFieldEnum | ClassGroupScalarFieldEnum[]
  }

  /**
   * ClassGroup findMany
   */
  export type ClassGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * Filter, which ClassGroups to fetch.
     */
    where?: ClassGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassGroups to fetch.
     */
    orderBy?: ClassGroupOrderByWithRelationInput | ClassGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClassGroups.
     */
    cursor?: ClassGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassGroups.
     */
    distinct?: ClassGroupScalarFieldEnum | ClassGroupScalarFieldEnum[]
  }

  /**
   * ClassGroup create
   */
  export type ClassGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a ClassGroup.
     */
    data: XOR<ClassGroupCreateInput, ClassGroupUncheckedCreateInput>
  }

  /**
   * ClassGroup createMany
   */
  export type ClassGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClassGroups.
     */
    data: ClassGroupCreateManyInput | ClassGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClassGroup createManyAndReturn
   */
  export type ClassGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * The data used to create many ClassGroups.
     */
    data: ClassGroupCreateManyInput | ClassGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClassGroup update
   */
  export type ClassGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a ClassGroup.
     */
    data: XOR<ClassGroupUpdateInput, ClassGroupUncheckedUpdateInput>
    /**
     * Choose, which ClassGroup to update.
     */
    where: ClassGroupWhereUniqueInput
  }

  /**
   * ClassGroup updateMany
   */
  export type ClassGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClassGroups.
     */
    data: XOR<ClassGroupUpdateManyMutationInput, ClassGroupUncheckedUpdateManyInput>
    /**
     * Filter which ClassGroups to update
     */
    where?: ClassGroupWhereInput
    /**
     * Limit how many ClassGroups to update.
     */
    limit?: number
  }

  /**
   * ClassGroup updateManyAndReturn
   */
  export type ClassGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * The data used to update ClassGroups.
     */
    data: XOR<ClassGroupUpdateManyMutationInput, ClassGroupUncheckedUpdateManyInput>
    /**
     * Filter which ClassGroups to update
     */
    where?: ClassGroupWhereInput
    /**
     * Limit how many ClassGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClassGroup upsert
   */
  export type ClassGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the ClassGroup to update in case it exists.
     */
    where: ClassGroupWhereUniqueInput
    /**
     * In case the ClassGroup found by the `where` argument doesn't exist, create a new ClassGroup with this data.
     */
    create: XOR<ClassGroupCreateInput, ClassGroupUncheckedCreateInput>
    /**
     * In case the ClassGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassGroupUpdateInput, ClassGroupUncheckedUpdateInput>
  }

  /**
   * ClassGroup delete
   */
  export type ClassGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
    /**
     * Filter which ClassGroup to delete.
     */
    where: ClassGroupWhereUniqueInput
  }

  /**
   * ClassGroup deleteMany
   */
  export type ClassGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassGroups to delete
     */
    where?: ClassGroupWhereInput
    /**
     * Limit how many ClassGroups to delete.
     */
    limit?: number
  }

  /**
   * ClassGroup.schedules
   */
  export type ClassGroup$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * ClassGroup.scheduleRules
   */
  export type ClassGroup$scheduleRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    cursor?: ScheduleRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * ClassGroup without action
   */
  export type ClassGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassGroup
     */
    select?: ClassGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassGroup
     */
    omit?: ClassGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassGroupInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ClassStatus | null
    cancelReason: string | null
    classGroupId: string | null
    subjectId: string | null
    professorId: string | null
    roomId: string | null
    ruleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    startTime: Date | null
    endTime: Date | null
    status: $Enums.ClassStatus | null
    cancelReason: string | null
    classGroupId: string | null
    subjectId: string | null
    professorId: string | null
    roomId: string | null
    ruleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    startTime: number
    endTime: number
    status: number
    cancelReason: number
    classGroupId: number
    subjectId: number
    professorId: number
    roomId: number
    ruleId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScheduleMinAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    status?: true
    cancelReason?: true
    classGroupId?: true
    subjectId?: true
    professorId?: true
    roomId?: true
    ruleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    status?: true
    cancelReason?: true
    classGroupId?: true
    subjectId?: true
    professorId?: true
    roomId?: true
    ruleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    status?: true
    cancelReason?: true
    classGroupId?: true
    subjectId?: true
    professorId?: true
    roomId?: true
    ruleId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    startTime: Date
    endTime: Date
    status: $Enums.ClassStatus
    cancelReason: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    ruleId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    cancelReason?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    ruleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rule?: boolean | Schedule$ruleArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    cancelReason?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    ruleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rule?: boolean | Schedule$ruleArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    cancelReason?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    ruleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rule?: boolean | Schedule$ruleArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    status?: boolean
    cancelReason?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    ruleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startTime" | "endTime" | "status" | "cancelReason" | "classGroupId" | "subjectId" | "professorId" | "roomId" | "ruleId" | "createdAt" | "updatedAt", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rule?: boolean | Schedule$ruleArgs<ExtArgs>
  }
  export type ScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rule?: boolean | Schedule$ruleArgs<ExtArgs>
  }
  export type ScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rule?: boolean | Schedule$ruleArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      classGroup: Prisma.$ClassGroupPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      professor: Prisma.$ProfessorPayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs>
      rule: Prisma.$ScheduleRulePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      startTime: Date
      endTime: Date
      status: $Enums.ClassStatus
      cancelReason: string | null
      classGroupId: string
      subjectId: string
      professorId: string
      roomId: string
      ruleId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules and returns the data updated in the database.
     * @param {ScheduleUpdateManyAndReturnArgs} args - Arguments to update many Schedules.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classGroup<T extends ClassGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassGroupDefaultArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professor<T extends ProfessorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessorDefaultArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rule<T extends Schedule$ruleArgs<ExtArgs> = {}>(args?: Subset<T, Schedule$ruleArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly startTime: FieldRef<"Schedule", 'DateTime'>
    readonly endTime: FieldRef<"Schedule", 'DateTime'>
    readonly status: FieldRef<"Schedule", 'ClassStatus'>
    readonly cancelReason: FieldRef<"Schedule", 'String'>
    readonly classGroupId: FieldRef<"Schedule", 'String'>
    readonly subjectId: FieldRef<"Schedule", 'String'>
    readonly professorId: FieldRef<"Schedule", 'String'>
    readonly roomId: FieldRef<"Schedule", 'String'>
    readonly ruleId: FieldRef<"Schedule", 'String'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
    readonly updatedAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule updateManyAndReturn
   */
  export type ScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule.rule
   */
  export type Schedule$ruleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model ScheduleOverride
   */

  export type AggregateScheduleOverride = {
    _count: ScheduleOverrideCountAggregateOutputType | null
    _min: ScheduleOverrideMinAggregateOutputType | null
    _max: ScheduleOverrideMaxAggregateOutputType | null
  }

  export type ScheduleOverrideMinAggregateOutputType = {
    id: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    type: $Enums.OverrideType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleOverrideMaxAggregateOutputType = {
    id: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    type: $Enums.OverrideType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleOverrideCountAggregateOutputType = {
    id: number
    title: number
    startTime: number
    endTime: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScheduleOverrideMinAggregateInputType = {
    id?: true
    title?: true
    startTime?: true
    endTime?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleOverrideMaxAggregateInputType = {
    id?: true
    title?: true
    startTime?: true
    endTime?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleOverrideCountAggregateInputType = {
    id?: true
    title?: true
    startTime?: true
    endTime?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduleOverrideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduleOverride to aggregate.
     */
    where?: ScheduleOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleOverrides to fetch.
     */
    orderBy?: ScheduleOverrideOrderByWithRelationInput | ScheduleOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScheduleOverrides
    **/
    _count?: true | ScheduleOverrideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleOverrideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleOverrideMaxAggregateInputType
  }

  export type GetScheduleOverrideAggregateType<T extends ScheduleOverrideAggregateArgs> = {
        [P in keyof T & keyof AggregateScheduleOverride]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduleOverride[P]>
      : GetScalarType<T[P], AggregateScheduleOverride[P]>
  }




  export type ScheduleOverrideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleOverrideWhereInput
    orderBy?: ScheduleOverrideOrderByWithAggregationInput | ScheduleOverrideOrderByWithAggregationInput[]
    by: ScheduleOverrideScalarFieldEnum[] | ScheduleOverrideScalarFieldEnum
    having?: ScheduleOverrideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleOverrideCountAggregateInputType | true
    _min?: ScheduleOverrideMinAggregateInputType
    _max?: ScheduleOverrideMaxAggregateInputType
  }

  export type ScheduleOverrideGroupByOutputType = {
    id: string
    title: string
    startTime: Date
    endTime: Date
    type: $Enums.OverrideType
    createdAt: Date
    updatedAt: Date
    _count: ScheduleOverrideCountAggregateOutputType | null
    _min: ScheduleOverrideMinAggregateOutputType | null
    _max: ScheduleOverrideMaxAggregateOutputType | null
  }

  type GetScheduleOverrideGroupByPayload<T extends ScheduleOverrideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleOverrideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleOverrideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleOverrideGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleOverrideGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleOverrideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["scheduleOverride"]>

  export type ScheduleOverrideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["scheduleOverride"]>

  export type ScheduleOverrideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["scheduleOverride"]>

  export type ScheduleOverrideSelectScalar = {
    id?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScheduleOverrideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "startTime" | "endTime" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["scheduleOverride"]>

  export type $ScheduleOverridePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScheduleOverride"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      startTime: Date
      endTime: Date
      type: $Enums.OverrideType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["scheduleOverride"]>
    composites: {}
  }

  type ScheduleOverrideGetPayload<S extends boolean | null | undefined | ScheduleOverrideDefaultArgs> = $Result.GetResult<Prisma.$ScheduleOverridePayload, S>

  type ScheduleOverrideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleOverrideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleOverrideCountAggregateInputType | true
    }

  export interface ScheduleOverrideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScheduleOverride'], meta: { name: 'ScheduleOverride' } }
    /**
     * Find zero or one ScheduleOverride that matches the filter.
     * @param {ScheduleOverrideFindUniqueArgs} args - Arguments to find a ScheduleOverride
     * @example
     * // Get one ScheduleOverride
     * const scheduleOverride = await prisma.scheduleOverride.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleOverrideFindUniqueArgs>(args: SelectSubset<T, ScheduleOverrideFindUniqueArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScheduleOverride that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleOverrideFindUniqueOrThrowArgs} args - Arguments to find a ScheduleOverride
     * @example
     * // Get one ScheduleOverride
     * const scheduleOverride = await prisma.scheduleOverride.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleOverrideFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleOverrideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduleOverride that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideFindFirstArgs} args - Arguments to find a ScheduleOverride
     * @example
     * // Get one ScheduleOverride
     * const scheduleOverride = await prisma.scheduleOverride.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleOverrideFindFirstArgs>(args?: SelectSubset<T, ScheduleOverrideFindFirstArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduleOverride that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideFindFirstOrThrowArgs} args - Arguments to find a ScheduleOverride
     * @example
     * // Get one ScheduleOverride
     * const scheduleOverride = await prisma.scheduleOverride.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleOverrideFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleOverrideFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScheduleOverrides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduleOverrides
     * const scheduleOverrides = await prisma.scheduleOverride.findMany()
     * 
     * // Get first 10 ScheduleOverrides
     * const scheduleOverrides = await prisma.scheduleOverride.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleOverrideWithIdOnly = await prisma.scheduleOverride.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleOverrideFindManyArgs>(args?: SelectSubset<T, ScheduleOverrideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScheduleOverride.
     * @param {ScheduleOverrideCreateArgs} args - Arguments to create a ScheduleOverride.
     * @example
     * // Create one ScheduleOverride
     * const ScheduleOverride = await prisma.scheduleOverride.create({
     *   data: {
     *     // ... data to create a ScheduleOverride
     *   }
     * })
     * 
     */
    create<T extends ScheduleOverrideCreateArgs>(args: SelectSubset<T, ScheduleOverrideCreateArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScheduleOverrides.
     * @param {ScheduleOverrideCreateManyArgs} args - Arguments to create many ScheduleOverrides.
     * @example
     * // Create many ScheduleOverrides
     * const scheduleOverride = await prisma.scheduleOverride.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleOverrideCreateManyArgs>(args?: SelectSubset<T, ScheduleOverrideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScheduleOverrides and returns the data saved in the database.
     * @param {ScheduleOverrideCreateManyAndReturnArgs} args - Arguments to create many ScheduleOverrides.
     * @example
     * // Create many ScheduleOverrides
     * const scheduleOverride = await prisma.scheduleOverride.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScheduleOverrides and only return the `id`
     * const scheduleOverrideWithIdOnly = await prisma.scheduleOverride.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleOverrideCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleOverrideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScheduleOverride.
     * @param {ScheduleOverrideDeleteArgs} args - Arguments to delete one ScheduleOverride.
     * @example
     * // Delete one ScheduleOverride
     * const ScheduleOverride = await prisma.scheduleOverride.delete({
     *   where: {
     *     // ... filter to delete one ScheduleOverride
     *   }
     * })
     * 
     */
    delete<T extends ScheduleOverrideDeleteArgs>(args: SelectSubset<T, ScheduleOverrideDeleteArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScheduleOverride.
     * @param {ScheduleOverrideUpdateArgs} args - Arguments to update one ScheduleOverride.
     * @example
     * // Update one ScheduleOverride
     * const scheduleOverride = await prisma.scheduleOverride.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleOverrideUpdateArgs>(args: SelectSubset<T, ScheduleOverrideUpdateArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScheduleOverrides.
     * @param {ScheduleOverrideDeleteManyArgs} args - Arguments to filter ScheduleOverrides to delete.
     * @example
     * // Delete a few ScheduleOverrides
     * const { count } = await prisma.scheduleOverride.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleOverrideDeleteManyArgs>(args?: SelectSubset<T, ScheduleOverrideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduleOverrides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduleOverrides
     * const scheduleOverride = await prisma.scheduleOverride.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleOverrideUpdateManyArgs>(args: SelectSubset<T, ScheduleOverrideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduleOverrides and returns the data updated in the database.
     * @param {ScheduleOverrideUpdateManyAndReturnArgs} args - Arguments to update many ScheduleOverrides.
     * @example
     * // Update many ScheduleOverrides
     * const scheduleOverride = await prisma.scheduleOverride.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScheduleOverrides and only return the `id`
     * const scheduleOverrideWithIdOnly = await prisma.scheduleOverride.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleOverrideUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleOverrideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScheduleOverride.
     * @param {ScheduleOverrideUpsertArgs} args - Arguments to update or create a ScheduleOverride.
     * @example
     * // Update or create a ScheduleOverride
     * const scheduleOverride = await prisma.scheduleOverride.upsert({
     *   create: {
     *     // ... data to create a ScheduleOverride
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduleOverride we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleOverrideUpsertArgs>(args: SelectSubset<T, ScheduleOverrideUpsertArgs<ExtArgs>>): Prisma__ScheduleOverrideClient<$Result.GetResult<Prisma.$ScheduleOverridePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScheduleOverrides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideCountArgs} args - Arguments to filter ScheduleOverrides to count.
     * @example
     * // Count the number of ScheduleOverrides
     * const count = await prisma.scheduleOverride.count({
     *   where: {
     *     // ... the filter for the ScheduleOverrides we want to count
     *   }
     * })
    **/
    count<T extends ScheduleOverrideCountArgs>(
      args?: Subset<T, ScheduleOverrideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleOverrideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScheduleOverride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleOverrideAggregateArgs>(args: Subset<T, ScheduleOverrideAggregateArgs>): Prisma.PrismaPromise<GetScheduleOverrideAggregateType<T>>

    /**
     * Group by ScheduleOverride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleOverrideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleOverrideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleOverrideGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleOverrideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleOverrideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleOverrideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScheduleOverride model
   */
  readonly fields: ScheduleOverrideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduleOverride.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleOverrideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScheduleOverride model
   */
  interface ScheduleOverrideFieldRefs {
    readonly id: FieldRef<"ScheduleOverride", 'String'>
    readonly title: FieldRef<"ScheduleOverride", 'String'>
    readonly startTime: FieldRef<"ScheduleOverride", 'DateTime'>
    readonly endTime: FieldRef<"ScheduleOverride", 'DateTime'>
    readonly type: FieldRef<"ScheduleOverride", 'OverrideType'>
    readonly createdAt: FieldRef<"ScheduleOverride", 'DateTime'>
    readonly updatedAt: FieldRef<"ScheduleOverride", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScheduleOverride findUnique
   */
  export type ScheduleOverrideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * Filter, which ScheduleOverride to fetch.
     */
    where: ScheduleOverrideWhereUniqueInput
  }

  /**
   * ScheduleOverride findUniqueOrThrow
   */
  export type ScheduleOverrideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * Filter, which ScheduleOverride to fetch.
     */
    where: ScheduleOverrideWhereUniqueInput
  }

  /**
   * ScheduleOverride findFirst
   */
  export type ScheduleOverrideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * Filter, which ScheduleOverride to fetch.
     */
    where?: ScheduleOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleOverrides to fetch.
     */
    orderBy?: ScheduleOverrideOrderByWithRelationInput | ScheduleOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduleOverrides.
     */
    cursor?: ScheduleOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleOverrides.
     */
    distinct?: ScheduleOverrideScalarFieldEnum | ScheduleOverrideScalarFieldEnum[]
  }

  /**
   * ScheduleOverride findFirstOrThrow
   */
  export type ScheduleOverrideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * Filter, which ScheduleOverride to fetch.
     */
    where?: ScheduleOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleOverrides to fetch.
     */
    orderBy?: ScheduleOverrideOrderByWithRelationInput | ScheduleOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduleOverrides.
     */
    cursor?: ScheduleOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleOverrides.
     */
    distinct?: ScheduleOverrideScalarFieldEnum | ScheduleOverrideScalarFieldEnum[]
  }

  /**
   * ScheduleOverride findMany
   */
  export type ScheduleOverrideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * Filter, which ScheduleOverrides to fetch.
     */
    where?: ScheduleOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleOverrides to fetch.
     */
    orderBy?: ScheduleOverrideOrderByWithRelationInput | ScheduleOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScheduleOverrides.
     */
    cursor?: ScheduleOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleOverrides.
     */
    distinct?: ScheduleOverrideScalarFieldEnum | ScheduleOverrideScalarFieldEnum[]
  }

  /**
   * ScheduleOverride create
   */
  export type ScheduleOverrideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * The data needed to create a ScheduleOverride.
     */
    data: XOR<ScheduleOverrideCreateInput, ScheduleOverrideUncheckedCreateInput>
  }

  /**
   * ScheduleOverride createMany
   */
  export type ScheduleOverrideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScheduleOverrides.
     */
    data: ScheduleOverrideCreateManyInput | ScheduleOverrideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduleOverride createManyAndReturn
   */
  export type ScheduleOverrideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * The data used to create many ScheduleOverrides.
     */
    data: ScheduleOverrideCreateManyInput | ScheduleOverrideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduleOverride update
   */
  export type ScheduleOverrideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * The data needed to update a ScheduleOverride.
     */
    data: XOR<ScheduleOverrideUpdateInput, ScheduleOverrideUncheckedUpdateInput>
    /**
     * Choose, which ScheduleOverride to update.
     */
    where: ScheduleOverrideWhereUniqueInput
  }

  /**
   * ScheduleOverride updateMany
   */
  export type ScheduleOverrideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScheduleOverrides.
     */
    data: XOR<ScheduleOverrideUpdateManyMutationInput, ScheduleOverrideUncheckedUpdateManyInput>
    /**
     * Filter which ScheduleOverrides to update
     */
    where?: ScheduleOverrideWhereInput
    /**
     * Limit how many ScheduleOverrides to update.
     */
    limit?: number
  }

  /**
   * ScheduleOverride updateManyAndReturn
   */
  export type ScheduleOverrideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * The data used to update ScheduleOverrides.
     */
    data: XOR<ScheduleOverrideUpdateManyMutationInput, ScheduleOverrideUncheckedUpdateManyInput>
    /**
     * Filter which ScheduleOverrides to update
     */
    where?: ScheduleOverrideWhereInput
    /**
     * Limit how many ScheduleOverrides to update.
     */
    limit?: number
  }

  /**
   * ScheduleOverride upsert
   */
  export type ScheduleOverrideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * The filter to search for the ScheduleOverride to update in case it exists.
     */
    where: ScheduleOverrideWhereUniqueInput
    /**
     * In case the ScheduleOverride found by the `where` argument doesn't exist, create a new ScheduleOverride with this data.
     */
    create: XOR<ScheduleOverrideCreateInput, ScheduleOverrideUncheckedCreateInput>
    /**
     * In case the ScheduleOverride was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleOverrideUpdateInput, ScheduleOverrideUncheckedUpdateInput>
  }

  /**
   * ScheduleOverride delete
   */
  export type ScheduleOverrideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
    /**
     * Filter which ScheduleOverride to delete.
     */
    where: ScheduleOverrideWhereUniqueInput
  }

  /**
   * ScheduleOverride deleteMany
   */
  export type ScheduleOverrideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduleOverrides to delete
     */
    where?: ScheduleOverrideWhereInput
    /**
     * Limit how many ScheduleOverrides to delete.
     */
    limit?: number
  }

  /**
   * ScheduleOverride without action
   */
  export type ScheduleOverrideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleOverride
     */
    select?: ScheduleOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleOverride
     */
    omit?: ScheduleOverrideOmit<ExtArgs> | null
  }


  /**
   * Model ScheduleRule
   */

  export type AggregateScheduleRule = {
    _count: ScheduleRuleCountAggregateOutputType | null
    _avg: ScheduleRuleAvgAggregateOutputType | null
    _sum: ScheduleRuleSumAggregateOutputType | null
    _min: ScheduleRuleMinAggregateOutputType | null
    _max: ScheduleRuleMaxAggregateOutputType | null
  }

  export type ScheduleRuleAvgAggregateOutputType = {
    daysOfWeek: number | null
    totalHours: number | null
  }

  export type ScheduleRuleSumAggregateOutputType = {
    daysOfWeek: number[]
    totalHours: number | null
  }

  export type ScheduleRuleMinAggregateOutputType = {
    id: string | null
    startTimeStr: string | null
    endTimeStr: string | null
    totalHours: number | null
    classGroupId: string | null
    subjectId: string | null
    professorId: string | null
    roomId: string | null
    rootRuleId: string | null
    dependsOnRuleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleRuleMaxAggregateOutputType = {
    id: string | null
    startTimeStr: string | null
    endTimeStr: string | null
    totalHours: number | null
    classGroupId: string | null
    subjectId: string | null
    professorId: string | null
    roomId: string | null
    rootRuleId: string | null
    dependsOnRuleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleRuleCountAggregateOutputType = {
    id: number
    daysOfWeek: number
    startTimeStr: number
    endTimeStr: number
    totalHours: number
    classGroupId: number
    subjectId: number
    professorId: number
    roomId: number
    rootRuleId: number
    dependsOnRuleId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScheduleRuleAvgAggregateInputType = {
    daysOfWeek?: true
    totalHours?: true
  }

  export type ScheduleRuleSumAggregateInputType = {
    daysOfWeek?: true
    totalHours?: true
  }

  export type ScheduleRuleMinAggregateInputType = {
    id?: true
    startTimeStr?: true
    endTimeStr?: true
    totalHours?: true
    classGroupId?: true
    subjectId?: true
    professorId?: true
    roomId?: true
    rootRuleId?: true
    dependsOnRuleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleRuleMaxAggregateInputType = {
    id?: true
    startTimeStr?: true
    endTimeStr?: true
    totalHours?: true
    classGroupId?: true
    subjectId?: true
    professorId?: true
    roomId?: true
    rootRuleId?: true
    dependsOnRuleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleRuleCountAggregateInputType = {
    id?: true
    daysOfWeek?: true
    startTimeStr?: true
    endTimeStr?: true
    totalHours?: true
    classGroupId?: true
    subjectId?: true
    professorId?: true
    roomId?: true
    rootRuleId?: true
    dependsOnRuleId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduleRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduleRule to aggregate.
     */
    where?: ScheduleRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleRules to fetch.
     */
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScheduleRules
    **/
    _count?: true | ScheduleRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleRuleMaxAggregateInputType
  }

  export type GetScheduleRuleAggregateType<T extends ScheduleRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateScheduleRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduleRule[P]>
      : GetScalarType<T[P], AggregateScheduleRule[P]>
  }




  export type ScheduleRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithAggregationInput | ScheduleRuleOrderByWithAggregationInput[]
    by: ScheduleRuleScalarFieldEnum[] | ScheduleRuleScalarFieldEnum
    having?: ScheduleRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleRuleCountAggregateInputType | true
    _avg?: ScheduleRuleAvgAggregateInputType
    _sum?: ScheduleRuleSumAggregateInputType
    _min?: ScheduleRuleMinAggregateInputType
    _max?: ScheduleRuleMaxAggregateInputType
  }

  export type ScheduleRuleGroupByOutputType = {
    id: string
    daysOfWeek: number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId: string | null
    dependsOnRuleId: string | null
    createdAt: Date
    updatedAt: Date
    _count: ScheduleRuleCountAggregateOutputType | null
    _avg: ScheduleRuleAvgAggregateOutputType | null
    _sum: ScheduleRuleSumAggregateOutputType | null
    _min: ScheduleRuleMinAggregateOutputType | null
    _max: ScheduleRuleMaxAggregateOutputType | null
  }

  type GetScheduleRuleGroupByPayload<T extends ScheduleRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleRuleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleRuleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    daysOfWeek?: boolean
    startTimeStr?: boolean
    endTimeStr?: boolean
    totalHours?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    rootRuleId?: boolean
    dependsOnRuleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    schedules?: boolean | ScheduleRule$schedulesArgs<ExtArgs>
    rootRule?: boolean | ScheduleRule$rootRuleArgs<ExtArgs>
    childRules?: boolean | ScheduleRule$childRulesArgs<ExtArgs>
    dependsOn?: boolean | ScheduleRule$dependsOnArgs<ExtArgs>
    dependentRules?: boolean | ScheduleRule$dependentRulesArgs<ExtArgs>
    _count?: boolean | ScheduleRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduleRule"]>

  export type ScheduleRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    daysOfWeek?: boolean
    startTimeStr?: boolean
    endTimeStr?: boolean
    totalHours?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    rootRuleId?: boolean
    dependsOnRuleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rootRule?: boolean | ScheduleRule$rootRuleArgs<ExtArgs>
    dependsOn?: boolean | ScheduleRule$dependsOnArgs<ExtArgs>
  }, ExtArgs["result"]["scheduleRule"]>

  export type ScheduleRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    daysOfWeek?: boolean
    startTimeStr?: boolean
    endTimeStr?: boolean
    totalHours?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    rootRuleId?: boolean
    dependsOnRuleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rootRule?: boolean | ScheduleRule$rootRuleArgs<ExtArgs>
    dependsOn?: boolean | ScheduleRule$dependsOnArgs<ExtArgs>
  }, ExtArgs["result"]["scheduleRule"]>

  export type ScheduleRuleSelectScalar = {
    id?: boolean
    daysOfWeek?: boolean
    startTimeStr?: boolean
    endTimeStr?: boolean
    totalHours?: boolean
    classGroupId?: boolean
    subjectId?: boolean
    professorId?: boolean
    roomId?: boolean
    rootRuleId?: boolean
    dependsOnRuleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScheduleRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "daysOfWeek" | "startTimeStr" | "endTimeStr" | "totalHours" | "classGroupId" | "subjectId" | "professorId" | "roomId" | "rootRuleId" | "dependsOnRuleId" | "createdAt" | "updatedAt", ExtArgs["result"]["scheduleRule"]>
  export type ScheduleRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    schedules?: boolean | ScheduleRule$schedulesArgs<ExtArgs>
    rootRule?: boolean | ScheduleRule$rootRuleArgs<ExtArgs>
    childRules?: boolean | ScheduleRule$childRulesArgs<ExtArgs>
    dependsOn?: boolean | ScheduleRule$dependsOnArgs<ExtArgs>
    dependentRules?: boolean | ScheduleRule$dependentRulesArgs<ExtArgs>
    _count?: boolean | ScheduleRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ScheduleRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rootRule?: boolean | ScheduleRule$rootRuleArgs<ExtArgs>
    dependsOn?: boolean | ScheduleRule$dependsOnArgs<ExtArgs>
  }
  export type ScheduleRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classGroup?: boolean | ClassGroupDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    professor?: boolean | ProfessorDefaultArgs<ExtArgs>
    room?: boolean | RoomDefaultArgs<ExtArgs>
    rootRule?: boolean | ScheduleRule$rootRuleArgs<ExtArgs>
    dependsOn?: boolean | ScheduleRule$dependsOnArgs<ExtArgs>
  }

  export type $ScheduleRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScheduleRule"
    objects: {
      classGroup: Prisma.$ClassGroupPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      professor: Prisma.$ProfessorPayload<ExtArgs>
      room: Prisma.$RoomPayload<ExtArgs>
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      rootRule: Prisma.$ScheduleRulePayload<ExtArgs> | null
      childRules: Prisma.$ScheduleRulePayload<ExtArgs>[]
      dependsOn: Prisma.$ScheduleRulePayload<ExtArgs> | null
      dependentRules: Prisma.$ScheduleRulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      daysOfWeek: number[]
      startTimeStr: string
      endTimeStr: string
      totalHours: number
      classGroupId: string
      subjectId: string
      professorId: string
      roomId: string
      rootRuleId: string | null
      dependsOnRuleId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["scheduleRule"]>
    composites: {}
  }

  type ScheduleRuleGetPayload<S extends boolean | null | undefined | ScheduleRuleDefaultArgs> = $Result.GetResult<Prisma.$ScheduleRulePayload, S>

  type ScheduleRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleRuleCountAggregateInputType | true
    }

  export interface ScheduleRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScheduleRule'], meta: { name: 'ScheduleRule' } }
    /**
     * Find zero or one ScheduleRule that matches the filter.
     * @param {ScheduleRuleFindUniqueArgs} args - Arguments to find a ScheduleRule
     * @example
     * // Get one ScheduleRule
     * const scheduleRule = await prisma.scheduleRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleRuleFindUniqueArgs>(args: SelectSubset<T, ScheduleRuleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScheduleRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleRuleFindUniqueOrThrowArgs} args - Arguments to find a ScheduleRule
     * @example
     * // Get one ScheduleRule
     * const scheduleRule = await prisma.scheduleRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduleRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleFindFirstArgs} args - Arguments to find a ScheduleRule
     * @example
     * // Get one ScheduleRule
     * const scheduleRule = await prisma.scheduleRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleRuleFindFirstArgs>(args?: SelectSubset<T, ScheduleRuleFindFirstArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduleRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleFindFirstOrThrowArgs} args - Arguments to find a ScheduleRule
     * @example
     * // Get one ScheduleRule
     * const scheduleRule = await prisma.scheduleRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScheduleRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduleRules
     * const scheduleRules = await prisma.scheduleRule.findMany()
     * 
     * // Get first 10 ScheduleRules
     * const scheduleRules = await prisma.scheduleRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleRuleWithIdOnly = await prisma.scheduleRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleRuleFindManyArgs>(args?: SelectSubset<T, ScheduleRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScheduleRule.
     * @param {ScheduleRuleCreateArgs} args - Arguments to create a ScheduleRule.
     * @example
     * // Create one ScheduleRule
     * const ScheduleRule = await prisma.scheduleRule.create({
     *   data: {
     *     // ... data to create a ScheduleRule
     *   }
     * })
     * 
     */
    create<T extends ScheduleRuleCreateArgs>(args: SelectSubset<T, ScheduleRuleCreateArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScheduleRules.
     * @param {ScheduleRuleCreateManyArgs} args - Arguments to create many ScheduleRules.
     * @example
     * // Create many ScheduleRules
     * const scheduleRule = await prisma.scheduleRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleRuleCreateManyArgs>(args?: SelectSubset<T, ScheduleRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScheduleRules and returns the data saved in the database.
     * @param {ScheduleRuleCreateManyAndReturnArgs} args - Arguments to create many ScheduleRules.
     * @example
     * // Create many ScheduleRules
     * const scheduleRule = await prisma.scheduleRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScheduleRules and only return the `id`
     * const scheduleRuleWithIdOnly = await prisma.scheduleRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScheduleRule.
     * @param {ScheduleRuleDeleteArgs} args - Arguments to delete one ScheduleRule.
     * @example
     * // Delete one ScheduleRule
     * const ScheduleRule = await prisma.scheduleRule.delete({
     *   where: {
     *     // ... filter to delete one ScheduleRule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleRuleDeleteArgs>(args: SelectSubset<T, ScheduleRuleDeleteArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScheduleRule.
     * @param {ScheduleRuleUpdateArgs} args - Arguments to update one ScheduleRule.
     * @example
     * // Update one ScheduleRule
     * const scheduleRule = await prisma.scheduleRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleRuleUpdateArgs>(args: SelectSubset<T, ScheduleRuleUpdateArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScheduleRules.
     * @param {ScheduleRuleDeleteManyArgs} args - Arguments to filter ScheduleRules to delete.
     * @example
     * // Delete a few ScheduleRules
     * const { count } = await prisma.scheduleRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleRuleDeleteManyArgs>(args?: SelectSubset<T, ScheduleRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduleRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduleRules
     * const scheduleRule = await prisma.scheduleRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleRuleUpdateManyArgs>(args: SelectSubset<T, ScheduleRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduleRules and returns the data updated in the database.
     * @param {ScheduleRuleUpdateManyAndReturnArgs} args - Arguments to update many ScheduleRules.
     * @example
     * // Update many ScheduleRules
     * const scheduleRule = await prisma.scheduleRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScheduleRules and only return the `id`
     * const scheduleRuleWithIdOnly = await prisma.scheduleRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScheduleRule.
     * @param {ScheduleRuleUpsertArgs} args - Arguments to update or create a ScheduleRule.
     * @example
     * // Update or create a ScheduleRule
     * const scheduleRule = await prisma.scheduleRule.upsert({
     *   create: {
     *     // ... data to create a ScheduleRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduleRule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleRuleUpsertArgs>(args: SelectSubset<T, ScheduleRuleUpsertArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScheduleRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleCountArgs} args - Arguments to filter ScheduleRules to count.
     * @example
     * // Count the number of ScheduleRules
     * const count = await prisma.scheduleRule.count({
     *   where: {
     *     // ... the filter for the ScheduleRules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleRuleCountArgs>(
      args?: Subset<T, ScheduleRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScheduleRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleRuleAggregateArgs>(args: Subset<T, ScheduleRuleAggregateArgs>): Prisma.PrismaPromise<GetScheduleRuleAggregateType<T>>

    /**
     * Group by ScheduleRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleRuleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScheduleRule model
   */
  readonly fields: ScheduleRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduleRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classGroup<T extends ClassGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassGroupDefaultArgs<ExtArgs>>): Prisma__ClassGroupClient<$Result.GetResult<Prisma.$ClassGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professor<T extends ProfessorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessorDefaultArgs<ExtArgs>>): Prisma__ProfessorClient<$Result.GetResult<Prisma.$ProfessorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedules<T extends ScheduleRule$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, ScheduleRule$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rootRule<T extends ScheduleRule$rootRuleArgs<ExtArgs> = {}>(args?: Subset<T, ScheduleRule$rootRuleArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    childRules<T extends ScheduleRule$childRulesArgs<ExtArgs> = {}>(args?: Subset<T, ScheduleRule$childRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dependsOn<T extends ScheduleRule$dependsOnArgs<ExtArgs> = {}>(args?: Subset<T, ScheduleRule$dependsOnArgs<ExtArgs>>): Prisma__ScheduleRuleClient<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dependentRules<T extends ScheduleRule$dependentRulesArgs<ExtArgs> = {}>(args?: Subset<T, ScheduleRule$dependentRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScheduleRule model
   */
  interface ScheduleRuleFieldRefs {
    readonly id: FieldRef<"ScheduleRule", 'String'>
    readonly daysOfWeek: FieldRef<"ScheduleRule", 'Int[]'>
    readonly startTimeStr: FieldRef<"ScheduleRule", 'String'>
    readonly endTimeStr: FieldRef<"ScheduleRule", 'String'>
    readonly totalHours: FieldRef<"ScheduleRule", 'Int'>
    readonly classGroupId: FieldRef<"ScheduleRule", 'String'>
    readonly subjectId: FieldRef<"ScheduleRule", 'String'>
    readonly professorId: FieldRef<"ScheduleRule", 'String'>
    readonly roomId: FieldRef<"ScheduleRule", 'String'>
    readonly rootRuleId: FieldRef<"ScheduleRule", 'String'>
    readonly dependsOnRuleId: FieldRef<"ScheduleRule", 'String'>
    readonly createdAt: FieldRef<"ScheduleRule", 'DateTime'>
    readonly updatedAt: FieldRef<"ScheduleRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScheduleRule findUnique
   */
  export type ScheduleRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleRule to fetch.
     */
    where: ScheduleRuleWhereUniqueInput
  }

  /**
   * ScheduleRule findUniqueOrThrow
   */
  export type ScheduleRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleRule to fetch.
     */
    where: ScheduleRuleWhereUniqueInput
  }

  /**
   * ScheduleRule findFirst
   */
  export type ScheduleRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleRule to fetch.
     */
    where?: ScheduleRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleRules to fetch.
     */
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduleRules.
     */
    cursor?: ScheduleRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleRules.
     */
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * ScheduleRule findFirstOrThrow
   */
  export type ScheduleRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleRule to fetch.
     */
    where?: ScheduleRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleRules to fetch.
     */
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduleRules.
     */
    cursor?: ScheduleRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleRules.
     */
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * ScheduleRule findMany
   */
  export type ScheduleRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleRules to fetch.
     */
    where?: ScheduleRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleRules to fetch.
     */
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScheduleRules.
     */
    cursor?: ScheduleRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleRules.
     */
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * ScheduleRule create
   */
  export type ScheduleRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a ScheduleRule.
     */
    data: XOR<ScheduleRuleCreateInput, ScheduleRuleUncheckedCreateInput>
  }

  /**
   * ScheduleRule createMany
   */
  export type ScheduleRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScheduleRules.
     */
    data: ScheduleRuleCreateManyInput | ScheduleRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduleRule createManyAndReturn
   */
  export type ScheduleRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * The data used to create many ScheduleRules.
     */
    data: ScheduleRuleCreateManyInput | ScheduleRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduleRule update
   */
  export type ScheduleRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a ScheduleRule.
     */
    data: XOR<ScheduleRuleUpdateInput, ScheduleRuleUncheckedUpdateInput>
    /**
     * Choose, which ScheduleRule to update.
     */
    where: ScheduleRuleWhereUniqueInput
  }

  /**
   * ScheduleRule updateMany
   */
  export type ScheduleRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScheduleRules.
     */
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyInput>
    /**
     * Filter which ScheduleRules to update
     */
    where?: ScheduleRuleWhereInput
    /**
     * Limit how many ScheduleRules to update.
     */
    limit?: number
  }

  /**
   * ScheduleRule updateManyAndReturn
   */
  export type ScheduleRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * The data used to update ScheduleRules.
     */
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyInput>
    /**
     * Filter which ScheduleRules to update
     */
    where?: ScheduleRuleWhereInput
    /**
     * Limit how many ScheduleRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduleRule upsert
   */
  export type ScheduleRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the ScheduleRule to update in case it exists.
     */
    where: ScheduleRuleWhereUniqueInput
    /**
     * In case the ScheduleRule found by the `where` argument doesn't exist, create a new ScheduleRule with this data.
     */
    create: XOR<ScheduleRuleCreateInput, ScheduleRuleUncheckedCreateInput>
    /**
     * In case the ScheduleRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleRuleUpdateInput, ScheduleRuleUncheckedUpdateInput>
  }

  /**
   * ScheduleRule delete
   */
  export type ScheduleRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    /**
     * Filter which ScheduleRule to delete.
     */
    where: ScheduleRuleWhereUniqueInput
  }

  /**
   * ScheduleRule deleteMany
   */
  export type ScheduleRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduleRules to delete
     */
    where?: ScheduleRuleWhereInput
    /**
     * Limit how many ScheduleRules to delete.
     */
    limit?: number
  }

  /**
   * ScheduleRule.schedules
   */
  export type ScheduleRule$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * ScheduleRule.rootRule
   */
  export type ScheduleRule$rootRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
  }

  /**
   * ScheduleRule.childRules
   */
  export type ScheduleRule$childRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    cursor?: ScheduleRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * ScheduleRule.dependsOn
   */
  export type ScheduleRule$dependsOnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
  }

  /**
   * ScheduleRule.dependentRules
   */
  export type ScheduleRule$dependentRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
    where?: ScheduleRuleWhereInput
    orderBy?: ScheduleRuleOrderByWithRelationInput | ScheduleRuleOrderByWithRelationInput[]
    cursor?: ScheduleRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleRuleScalarFieldEnum | ScheduleRuleScalarFieldEnum[]
  }

  /**
   * ScheduleRule without action
   */
  export type ScheduleRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleRule
     */
    select?: ScheduleRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleRule
     */
    omit?: ScheduleRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleRuleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfessorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    degree: 'degree',
    department: 'department',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessorScalarFieldEnum = (typeof ProfessorScalarFieldEnum)[keyof typeof ProfessorScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    capacity: 'capacity',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const CurriculumScalarFieldEnum: {
    id: 'id',
    name: 'name',
    active: 'active',
    courseId: 'courseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CurriculumScalarFieldEnum = (typeof CurriculumScalarFieldEnum)[keyof typeof CurriculumScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    hours: 'hours',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const CurriculumSubjectScalarFieldEnum: {
    curriculumId: 'curriculumId',
    subjectId: 'subjectId',
    module: 'module'
  };

  export type CurriculumSubjectScalarFieldEnum = (typeof CurriculumSubjectScalarFieldEnum)[keyof typeof CurriculumSubjectScalarFieldEnum]


  export const ClassGroupScalarFieldEnum: {
    id: 'id',
    code: 'code',
    shift: 'shift',
    startDate: 'startDate',
    endDate: 'endDate',
    curriculumId: 'curriculumId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClassGroupScalarFieldEnum = (typeof ClassGroupScalarFieldEnum)[keyof typeof ClassGroupScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    cancelReason: 'cancelReason',
    classGroupId: 'classGroupId',
    subjectId: 'subjectId',
    professorId: 'professorId',
    roomId: 'roomId',
    ruleId: 'ruleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const ScheduleOverrideScalarFieldEnum: {
    id: 'id',
    title: 'title',
    startTime: 'startTime',
    endTime: 'endTime',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScheduleOverrideScalarFieldEnum = (typeof ScheduleOverrideScalarFieldEnum)[keyof typeof ScheduleOverrideScalarFieldEnum]


  export const ScheduleRuleScalarFieldEnum: {
    id: 'id',
    daysOfWeek: 'daysOfWeek',
    startTimeStr: 'startTimeStr',
    endTimeStr: 'endTimeStr',
    totalHours: 'totalHours',
    classGroupId: 'classGroupId',
    subjectId: 'subjectId',
    professorId: 'professorId',
    roomId: 'roomId',
    rootRuleId: 'rootRuleId',
    dependsOnRuleId: 'dependsOnRuleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScheduleRuleScalarFieldEnum = (typeof ScheduleRuleScalarFieldEnum)[keyof typeof ScheduleRuleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ClassStatus'
   */
  export type EnumClassStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClassStatus'>
    


  /**
   * Reference to a field of type 'ClassStatus[]'
   */
  export type ListEnumClassStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClassStatus[]'>
    


  /**
   * Reference to a field of type 'OverrideType'
   */
  export type EnumOverrideTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OverrideType'>
    


  /**
   * Reference to a field of type 'OverrideType[]'
   */
  export type ListEnumOverrideTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OverrideType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfessorWhereInput = {
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    id?: StringFilter<"Professor"> | string
    name?: StringFilter<"Professor"> | string
    email?: StringFilter<"Professor"> | string
    degree?: StringNullableFilter<"Professor"> | string | null
    department?: StringNullableFilter<"Professor"> | string | null
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }

  export type ProfessorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    degree?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    schedules?: ScheduleOrderByRelationAggregateInput
    scheduleRules?: ScheduleRuleOrderByRelationAggregateInput
  }

  export type ProfessorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ProfessorWhereInput | ProfessorWhereInput[]
    OR?: ProfessorWhereInput[]
    NOT?: ProfessorWhereInput | ProfessorWhereInput[]
    name?: StringFilter<"Professor"> | string
    degree?: StringNullableFilter<"Professor"> | string | null
    department?: StringNullableFilter<"Professor"> | string | null
    createdAt?: DateTimeFilter<"Professor"> | Date | string
    updatedAt?: DateTimeFilter<"Professor"> | Date | string
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }, "id" | "email">

  export type ProfessorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    degree?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessorCountOrderByAggregateInput
    _max?: ProfessorMaxOrderByAggregateInput
    _min?: ProfessorMinOrderByAggregateInput
  }

  export type ProfessorScalarWhereWithAggregatesInput = {
    AND?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    OR?: ProfessorScalarWhereWithAggregatesInput[]
    NOT?: ProfessorScalarWhereWithAggregatesInput | ProfessorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Professor"> | string
    name?: StringWithAggregatesFilter<"Professor"> | string
    email?: StringWithAggregatesFilter<"Professor"> | string
    degree?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    department?: StringNullableWithAggregatesFilter<"Professor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Professor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Professor"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    capacity?: IntFilter<"Room"> | number
    type?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    schedules?: ScheduleOrderByRelationAggregateInput
    scheduleRules?: ScheduleRuleOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    capacity?: IntFilter<"Room"> | number
    type?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }, "id" | "name">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    capacity?: IntWithAggregatesFilter<"Room"> | number
    type?: StringWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    code?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    curriculums?: CurriculumListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    curriculums?: CurriculumOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name?: StringFilter<"Course"> | string
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    curriculums?: CurriculumListRelationFilter
  }, "id" | "code">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    code?: StringWithAggregatesFilter<"Course"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type CurriculumWhereInput = {
    AND?: CurriculumWhereInput | CurriculumWhereInput[]
    OR?: CurriculumWhereInput[]
    NOT?: CurriculumWhereInput | CurriculumWhereInput[]
    id?: StringFilter<"Curriculum"> | string
    name?: StringFilter<"Curriculum"> | string
    active?: BoolFilter<"Curriculum"> | boolean
    courseId?: StringFilter<"Curriculum"> | string
    createdAt?: DateTimeFilter<"Curriculum"> | Date | string
    updatedAt?: DateTimeFilter<"Curriculum"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    subjects?: CurriculumSubjectListRelationFilter
    classGroups?: ClassGroupListRelationFilter
  }

  export type CurriculumOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    subjects?: CurriculumSubjectOrderByRelationAggregateInput
    classGroups?: ClassGroupOrderByRelationAggregateInput
  }

  export type CurriculumWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CurriculumWhereInput | CurriculumWhereInput[]
    OR?: CurriculumWhereInput[]
    NOT?: CurriculumWhereInput | CurriculumWhereInput[]
    name?: StringFilter<"Curriculum"> | string
    active?: BoolFilter<"Curriculum"> | boolean
    courseId?: StringFilter<"Curriculum"> | string
    createdAt?: DateTimeFilter<"Curriculum"> | Date | string
    updatedAt?: DateTimeFilter<"Curriculum"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    subjects?: CurriculumSubjectListRelationFilter
    classGroups?: ClassGroupListRelationFilter
  }, "id">

  export type CurriculumOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CurriculumCountOrderByAggregateInput
    _max?: CurriculumMaxOrderByAggregateInput
    _min?: CurriculumMinOrderByAggregateInput
  }

  export type CurriculumScalarWhereWithAggregatesInput = {
    AND?: CurriculumScalarWhereWithAggregatesInput | CurriculumScalarWhereWithAggregatesInput[]
    OR?: CurriculumScalarWhereWithAggregatesInput[]
    NOT?: CurriculumScalarWhereWithAggregatesInput | CurriculumScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Curriculum"> | string
    name?: StringWithAggregatesFilter<"Curriculum"> | string
    active?: BoolWithAggregatesFilter<"Curriculum"> | boolean
    courseId?: StringWithAggregatesFilter<"Curriculum"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Curriculum"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Curriculum"> | Date | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    code?: StringFilter<"Subject"> | string
    hours?: IntFilter<"Subject"> | number
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    curriculums?: CurriculumSubjectListRelationFilter
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    hours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    curriculums?: CurriculumSubjectOrderByRelationAggregateInput
    schedules?: ScheduleOrderByRelationAggregateInput
    scheduleRules?: ScheduleRuleOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    name?: StringFilter<"Subject"> | string
    hours?: IntFilter<"Subject"> | number
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    curriculums?: CurriculumSubjectListRelationFilter
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }, "id" | "code">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    hours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _avg?: SubjectAvgOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
    _sum?: SubjectSumOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subject"> | string
    name?: StringWithAggregatesFilter<"Subject"> | string
    code?: StringWithAggregatesFilter<"Subject"> | string
    hours?: IntWithAggregatesFilter<"Subject"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
  }

  export type CurriculumSubjectWhereInput = {
    AND?: CurriculumSubjectWhereInput | CurriculumSubjectWhereInput[]
    OR?: CurriculumSubjectWhereInput[]
    NOT?: CurriculumSubjectWhereInput | CurriculumSubjectWhereInput[]
    curriculumId?: StringFilter<"CurriculumSubject"> | string
    subjectId?: StringFilter<"CurriculumSubject"> | string
    module?: IntFilter<"CurriculumSubject"> | number
    curriculum?: XOR<CurriculumScalarRelationFilter, CurriculumWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }

  export type CurriculumSubjectOrderByWithRelationInput = {
    curriculumId?: SortOrder
    subjectId?: SortOrder
    module?: SortOrder
    curriculum?: CurriculumOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type CurriculumSubjectWhereUniqueInput = Prisma.AtLeast<{
    curriculumId_subjectId?: CurriculumSubjectCurriculumIdSubjectIdCompoundUniqueInput
    AND?: CurriculumSubjectWhereInput | CurriculumSubjectWhereInput[]
    OR?: CurriculumSubjectWhereInput[]
    NOT?: CurriculumSubjectWhereInput | CurriculumSubjectWhereInput[]
    curriculumId?: StringFilter<"CurriculumSubject"> | string
    subjectId?: StringFilter<"CurriculumSubject"> | string
    module?: IntFilter<"CurriculumSubject"> | number
    curriculum?: XOR<CurriculumScalarRelationFilter, CurriculumWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }, "curriculumId_subjectId">

  export type CurriculumSubjectOrderByWithAggregationInput = {
    curriculumId?: SortOrder
    subjectId?: SortOrder
    module?: SortOrder
    _count?: CurriculumSubjectCountOrderByAggregateInput
    _avg?: CurriculumSubjectAvgOrderByAggregateInput
    _max?: CurriculumSubjectMaxOrderByAggregateInput
    _min?: CurriculumSubjectMinOrderByAggregateInput
    _sum?: CurriculumSubjectSumOrderByAggregateInput
  }

  export type CurriculumSubjectScalarWhereWithAggregatesInput = {
    AND?: CurriculumSubjectScalarWhereWithAggregatesInput | CurriculumSubjectScalarWhereWithAggregatesInput[]
    OR?: CurriculumSubjectScalarWhereWithAggregatesInput[]
    NOT?: CurriculumSubjectScalarWhereWithAggregatesInput | CurriculumSubjectScalarWhereWithAggregatesInput[]
    curriculumId?: StringWithAggregatesFilter<"CurriculumSubject"> | string
    subjectId?: StringWithAggregatesFilter<"CurriculumSubject"> | string
    module?: IntWithAggregatesFilter<"CurriculumSubject"> | number
  }

  export type ClassGroupWhereInput = {
    AND?: ClassGroupWhereInput | ClassGroupWhereInput[]
    OR?: ClassGroupWhereInput[]
    NOT?: ClassGroupWhereInput | ClassGroupWhereInput[]
    id?: StringFilter<"ClassGroup"> | string
    code?: StringFilter<"ClassGroup"> | string
    shift?: StringFilter<"ClassGroup"> | string
    startDate?: DateTimeFilter<"ClassGroup"> | Date | string
    endDate?: DateTimeNullableFilter<"ClassGroup"> | Date | string | null
    curriculumId?: StringFilter<"ClassGroup"> | string
    createdAt?: DateTimeFilter<"ClassGroup"> | Date | string
    updatedAt?: DateTimeFilter<"ClassGroup"> | Date | string
    curriculum?: XOR<CurriculumScalarRelationFilter, CurriculumWhereInput>
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }

  export type ClassGroupOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    shift?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    curriculumId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    curriculum?: CurriculumOrderByWithRelationInput
    schedules?: ScheduleOrderByRelationAggregateInput
    scheduleRules?: ScheduleRuleOrderByRelationAggregateInput
  }

  export type ClassGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ClassGroupWhereInput | ClassGroupWhereInput[]
    OR?: ClassGroupWhereInput[]
    NOT?: ClassGroupWhereInput | ClassGroupWhereInput[]
    shift?: StringFilter<"ClassGroup"> | string
    startDate?: DateTimeFilter<"ClassGroup"> | Date | string
    endDate?: DateTimeNullableFilter<"ClassGroup"> | Date | string | null
    curriculumId?: StringFilter<"ClassGroup"> | string
    createdAt?: DateTimeFilter<"ClassGroup"> | Date | string
    updatedAt?: DateTimeFilter<"ClassGroup"> | Date | string
    curriculum?: XOR<CurriculumScalarRelationFilter, CurriculumWhereInput>
    schedules?: ScheduleListRelationFilter
    scheduleRules?: ScheduleRuleListRelationFilter
  }, "id" | "code">

  export type ClassGroupOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    shift?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    curriculumId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClassGroupCountOrderByAggregateInput
    _max?: ClassGroupMaxOrderByAggregateInput
    _min?: ClassGroupMinOrderByAggregateInput
  }

  export type ClassGroupScalarWhereWithAggregatesInput = {
    AND?: ClassGroupScalarWhereWithAggregatesInput | ClassGroupScalarWhereWithAggregatesInput[]
    OR?: ClassGroupScalarWhereWithAggregatesInput[]
    NOT?: ClassGroupScalarWhereWithAggregatesInput | ClassGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClassGroup"> | string
    code?: StringWithAggregatesFilter<"ClassGroup"> | string
    shift?: StringWithAggregatesFilter<"ClassGroup"> | string
    startDate?: DateTimeWithAggregatesFilter<"ClassGroup"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"ClassGroup"> | Date | string | null
    curriculumId?: StringWithAggregatesFilter<"ClassGroup"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ClassGroup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClassGroup"> | Date | string
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    startTime?: DateTimeFilter<"Schedule"> | Date | string
    endTime?: DateTimeFilter<"Schedule"> | Date | string
    status?: EnumClassStatusFilter<"Schedule"> | $Enums.ClassStatus
    cancelReason?: StringNullableFilter<"Schedule"> | string | null
    classGroupId?: StringFilter<"Schedule"> | string
    subjectId?: StringFilter<"Schedule"> | string
    professorId?: StringFilter<"Schedule"> | string
    roomId?: StringFilter<"Schedule"> | string
    ruleId?: StringNullableFilter<"Schedule"> | string | null
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
    classGroup?: XOR<ClassGroupScalarRelationFilter, ClassGroupWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    professor?: XOR<ProfessorScalarRelationFilter, ProfessorWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    rule?: XOR<ScheduleRuleNullableScalarRelationFilter, ScheduleRuleWhereInput> | null
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    cancelReason?: SortOrderInput | SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    ruleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classGroup?: ClassGroupOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    professor?: ProfessorOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
    rule?: ScheduleRuleOrderByWithRelationInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    startTime?: DateTimeFilter<"Schedule"> | Date | string
    endTime?: DateTimeFilter<"Schedule"> | Date | string
    status?: EnumClassStatusFilter<"Schedule"> | $Enums.ClassStatus
    cancelReason?: StringNullableFilter<"Schedule"> | string | null
    classGroupId?: StringFilter<"Schedule"> | string
    subjectId?: StringFilter<"Schedule"> | string
    professorId?: StringFilter<"Schedule"> | string
    roomId?: StringFilter<"Schedule"> | string
    ruleId?: StringNullableFilter<"Schedule"> | string | null
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
    classGroup?: XOR<ClassGroupScalarRelationFilter, ClassGroupWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    professor?: XOR<ProfessorScalarRelationFilter, ProfessorWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    rule?: XOR<ScheduleRuleNullableScalarRelationFilter, ScheduleRuleWhereInput> | null
  }, "id">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    cancelReason?: SortOrderInput | SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    ruleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    startTime?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    status?: EnumClassStatusWithAggregatesFilter<"Schedule"> | $Enums.ClassStatus
    cancelReason?: StringNullableWithAggregatesFilter<"Schedule"> | string | null
    classGroupId?: StringWithAggregatesFilter<"Schedule"> | string
    subjectId?: StringWithAggregatesFilter<"Schedule"> | string
    professorId?: StringWithAggregatesFilter<"Schedule"> | string
    roomId?: StringWithAggregatesFilter<"Schedule"> | string
    ruleId?: StringNullableWithAggregatesFilter<"Schedule"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type ScheduleOverrideWhereInput = {
    AND?: ScheduleOverrideWhereInput | ScheduleOverrideWhereInput[]
    OR?: ScheduleOverrideWhereInput[]
    NOT?: ScheduleOverrideWhereInput | ScheduleOverrideWhereInput[]
    id?: StringFilter<"ScheduleOverride"> | string
    title?: StringFilter<"ScheduleOverride"> | string
    startTime?: DateTimeFilter<"ScheduleOverride"> | Date | string
    endTime?: DateTimeFilter<"ScheduleOverride"> | Date | string
    type?: EnumOverrideTypeFilter<"ScheduleOverride"> | $Enums.OverrideType
    createdAt?: DateTimeFilter<"ScheduleOverride"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduleOverride"> | Date | string
  }

  export type ScheduleOverrideOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleOverrideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleOverrideWhereInput | ScheduleOverrideWhereInput[]
    OR?: ScheduleOverrideWhereInput[]
    NOT?: ScheduleOverrideWhereInput | ScheduleOverrideWhereInput[]
    title?: StringFilter<"ScheduleOverride"> | string
    startTime?: DateTimeFilter<"ScheduleOverride"> | Date | string
    endTime?: DateTimeFilter<"ScheduleOverride"> | Date | string
    type?: EnumOverrideTypeFilter<"ScheduleOverride"> | $Enums.OverrideType
    createdAt?: DateTimeFilter<"ScheduleOverride"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduleOverride"> | Date | string
  }, "id">

  export type ScheduleOverrideOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduleOverrideCountOrderByAggregateInput
    _max?: ScheduleOverrideMaxOrderByAggregateInput
    _min?: ScheduleOverrideMinOrderByAggregateInput
  }

  export type ScheduleOverrideScalarWhereWithAggregatesInput = {
    AND?: ScheduleOverrideScalarWhereWithAggregatesInput | ScheduleOverrideScalarWhereWithAggregatesInput[]
    OR?: ScheduleOverrideScalarWhereWithAggregatesInput[]
    NOT?: ScheduleOverrideScalarWhereWithAggregatesInput | ScheduleOverrideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScheduleOverride"> | string
    title?: StringWithAggregatesFilter<"ScheduleOverride"> | string
    startTime?: DateTimeWithAggregatesFilter<"ScheduleOverride"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"ScheduleOverride"> | Date | string
    type?: EnumOverrideTypeWithAggregatesFilter<"ScheduleOverride"> | $Enums.OverrideType
    createdAt?: DateTimeWithAggregatesFilter<"ScheduleOverride"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ScheduleOverride"> | Date | string
  }

  export type ScheduleRuleWhereInput = {
    AND?: ScheduleRuleWhereInput | ScheduleRuleWhereInput[]
    OR?: ScheduleRuleWhereInput[]
    NOT?: ScheduleRuleWhereInput | ScheduleRuleWhereInput[]
    id?: StringFilter<"ScheduleRule"> | string
    daysOfWeek?: IntNullableListFilter<"ScheduleRule">
    startTimeStr?: StringFilter<"ScheduleRule"> | string
    endTimeStr?: StringFilter<"ScheduleRule"> | string
    totalHours?: IntFilter<"ScheduleRule"> | number
    classGroupId?: StringFilter<"ScheduleRule"> | string
    subjectId?: StringFilter<"ScheduleRule"> | string
    professorId?: StringFilter<"ScheduleRule"> | string
    roomId?: StringFilter<"ScheduleRule"> | string
    rootRuleId?: StringNullableFilter<"ScheduleRule"> | string | null
    dependsOnRuleId?: StringNullableFilter<"ScheduleRule"> | string | null
    createdAt?: DateTimeFilter<"ScheduleRule"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduleRule"> | Date | string
    classGroup?: XOR<ClassGroupScalarRelationFilter, ClassGroupWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    professor?: XOR<ProfessorScalarRelationFilter, ProfessorWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    schedules?: ScheduleListRelationFilter
    rootRule?: XOR<ScheduleRuleNullableScalarRelationFilter, ScheduleRuleWhereInput> | null
    childRules?: ScheduleRuleListRelationFilter
    dependsOn?: XOR<ScheduleRuleNullableScalarRelationFilter, ScheduleRuleWhereInput> | null
    dependentRules?: ScheduleRuleListRelationFilter
  }

  export type ScheduleRuleOrderByWithRelationInput = {
    id?: SortOrder
    daysOfWeek?: SortOrder
    startTimeStr?: SortOrder
    endTimeStr?: SortOrder
    totalHours?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    rootRuleId?: SortOrderInput | SortOrder
    dependsOnRuleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classGroup?: ClassGroupOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    professor?: ProfessorOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
    schedules?: ScheduleOrderByRelationAggregateInput
    rootRule?: ScheduleRuleOrderByWithRelationInput
    childRules?: ScheduleRuleOrderByRelationAggregateInput
    dependsOn?: ScheduleRuleOrderByWithRelationInput
    dependentRules?: ScheduleRuleOrderByRelationAggregateInput
  }

  export type ScheduleRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduleRuleWhereInput | ScheduleRuleWhereInput[]
    OR?: ScheduleRuleWhereInput[]
    NOT?: ScheduleRuleWhereInput | ScheduleRuleWhereInput[]
    daysOfWeek?: IntNullableListFilter<"ScheduleRule">
    startTimeStr?: StringFilter<"ScheduleRule"> | string
    endTimeStr?: StringFilter<"ScheduleRule"> | string
    totalHours?: IntFilter<"ScheduleRule"> | number
    classGroupId?: StringFilter<"ScheduleRule"> | string
    subjectId?: StringFilter<"ScheduleRule"> | string
    professorId?: StringFilter<"ScheduleRule"> | string
    roomId?: StringFilter<"ScheduleRule"> | string
    rootRuleId?: StringNullableFilter<"ScheduleRule"> | string | null
    dependsOnRuleId?: StringNullableFilter<"ScheduleRule"> | string | null
    createdAt?: DateTimeFilter<"ScheduleRule"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduleRule"> | Date | string
    classGroup?: XOR<ClassGroupScalarRelationFilter, ClassGroupWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    professor?: XOR<ProfessorScalarRelationFilter, ProfessorWhereInput>
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    schedules?: ScheduleListRelationFilter
    rootRule?: XOR<ScheduleRuleNullableScalarRelationFilter, ScheduleRuleWhereInput> | null
    childRules?: ScheduleRuleListRelationFilter
    dependsOn?: XOR<ScheduleRuleNullableScalarRelationFilter, ScheduleRuleWhereInput> | null
    dependentRules?: ScheduleRuleListRelationFilter
  }, "id">

  export type ScheduleRuleOrderByWithAggregationInput = {
    id?: SortOrder
    daysOfWeek?: SortOrder
    startTimeStr?: SortOrder
    endTimeStr?: SortOrder
    totalHours?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    rootRuleId?: SortOrderInput | SortOrder
    dependsOnRuleId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduleRuleCountOrderByAggregateInput
    _avg?: ScheduleRuleAvgOrderByAggregateInput
    _max?: ScheduleRuleMaxOrderByAggregateInput
    _min?: ScheduleRuleMinOrderByAggregateInput
    _sum?: ScheduleRuleSumOrderByAggregateInput
  }

  export type ScheduleRuleScalarWhereWithAggregatesInput = {
    AND?: ScheduleRuleScalarWhereWithAggregatesInput | ScheduleRuleScalarWhereWithAggregatesInput[]
    OR?: ScheduleRuleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleRuleScalarWhereWithAggregatesInput | ScheduleRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScheduleRule"> | string
    daysOfWeek?: IntNullableListFilter<"ScheduleRule">
    startTimeStr?: StringWithAggregatesFilter<"ScheduleRule"> | string
    endTimeStr?: StringWithAggregatesFilter<"ScheduleRule"> | string
    totalHours?: IntWithAggregatesFilter<"ScheduleRule"> | number
    classGroupId?: StringWithAggregatesFilter<"ScheduleRule"> | string
    subjectId?: StringWithAggregatesFilter<"ScheduleRule"> | string
    professorId?: StringWithAggregatesFilter<"ScheduleRule"> | string
    roomId?: StringWithAggregatesFilter<"ScheduleRule"> | string
    rootRuleId?: StringNullableWithAggregatesFilter<"ScheduleRule"> | string | null
    dependsOnRuleId?: StringNullableWithAggregatesFilter<"ScheduleRule"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ScheduleRule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ScheduleRule"> | Date | string
  }

  export type ProfessorCreateInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutProfessorInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutProfessorInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutProfessorNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutProfessorNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorCreateManyInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutRoomInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRoomInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutRoomNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRoomNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumCreateInput = {
    id?: string
    name: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutCurriculumsInput
    subjects?: CurriculumSubjectCreateNestedManyWithoutCurriculumInput
    classGroups?: ClassGroupCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumUncheckedCreateInput = {
    id?: string
    name: string
    active?: boolean
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: CurriculumSubjectUncheckedCreateNestedManyWithoutCurriculumInput
    classGroups?: ClassGroupUncheckedCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutCurriculumsNestedInput
    subjects?: CurriculumSubjectUpdateManyWithoutCurriculumNestedInput
    classGroups?: ClassGroupUpdateManyWithoutCurriculumNestedInput
  }

  export type CurriculumUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: CurriculumSubjectUncheckedUpdateManyWithoutCurriculumNestedInput
    classGroups?: ClassGroupUncheckedUpdateManyWithoutCurriculumNestedInput
  }

  export type CurriculumCreateManyInput = {
    id?: string
    name: string
    active?: boolean
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CurriculumUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumSubjectCreateNestedManyWithoutSubjectInput
    schedules?: ScheduleCreateNestedManyWithoutSubjectInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumSubjectUncheckedCreateNestedManyWithoutSubjectInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutSubjectInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumSubjectUpdateManyWithoutSubjectNestedInput
    schedules?: ScheduleUpdateManyWithoutSubjectNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumSubjectUncheckedUpdateManyWithoutSubjectNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutSubjectNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumSubjectCreateInput = {
    module: number
    curriculum: CurriculumCreateNestedOneWithoutSubjectsInput
    subject: SubjectCreateNestedOneWithoutCurriculumsInput
  }

  export type CurriculumSubjectUncheckedCreateInput = {
    curriculumId: string
    subjectId: string
    module: number
  }

  export type CurriculumSubjectUpdateInput = {
    module?: IntFieldUpdateOperationsInput | number
    curriculum?: CurriculumUpdateOneRequiredWithoutSubjectsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutCurriculumsNestedInput
  }

  export type CurriculumSubjectUncheckedUpdateInput = {
    curriculumId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    module?: IntFieldUpdateOperationsInput | number
  }

  export type CurriculumSubjectCreateManyInput = {
    curriculumId: string
    subjectId: string
    module: number
  }

  export type CurriculumSubjectUpdateManyMutationInput = {
    module?: IntFieldUpdateOperationsInput | number
  }

  export type CurriculumSubjectUncheckedUpdateManyInput = {
    curriculumId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    module?: IntFieldUpdateOperationsInput | number
  }

  export type ClassGroupCreateInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculum: CurriculumCreateNestedOneWithoutClassGroupsInput
    schedules?: ScheduleCreateNestedManyWithoutClassGroupInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupUncheckedCreateInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    curriculumId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutClassGroupInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculum?: CurriculumUpdateOneRequiredWithoutClassGroupsNestedInput
    schedules?: ScheduleUpdateManyWithoutClassGroupNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutClassGroupNestedInput
  }

  export type ClassGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curriculumId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutClassGroupNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutClassGroupNestedInput
  }

  export type ClassGroupCreateManyInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    curriculumId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curriculumId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutSchedulesInput
    subject: SubjectCreateNestedOneWithoutSchedulesInput
    professor: ProfessorCreateNestedOneWithoutSchedulesInput
    room: RoomCreateNestedOneWithoutSchedulesInput
    rule?: ScheduleRuleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutSchedulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutSchedulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutSchedulesNestedInput
    room?: RoomUpdateOneRequiredWithoutSchedulesNestedInput
    rule?: ScheduleRuleUpdateOneWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleOverrideCreateInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    type?: $Enums.OverrideType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleOverrideUncheckedCreateInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    type?: $Enums.OverrideType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleOverrideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumOverrideTypeFieldUpdateOperationsInput | $Enums.OverrideType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleOverrideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumOverrideTypeFieldUpdateOperationsInput | $Enums.OverrideType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleOverrideCreateManyInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    type?: $Enums.OverrideType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleOverrideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumOverrideTypeFieldUpdateOperationsInput | $Enums.OverrideType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleOverrideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumOverrideTypeFieldUpdateOperationsInput | $Enums.OverrideType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleCreateInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleCreateManyInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type ScheduleRuleListRelationFilter = {
    every?: ScheduleRuleWhereInput
    some?: ScheduleRuleWhereInput
    none?: ScheduleRuleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    degree?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    degree?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    degree?: SortOrder
    department?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CurriculumListRelationFilter = {
    every?: CurriculumWhereInput
    some?: CurriculumWhereInput
    none?: CurriculumWhereInput
  }

  export type CurriculumOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type CurriculumSubjectListRelationFilter = {
    every?: CurriculumSubjectWhereInput
    some?: CurriculumSubjectWhereInput
    none?: CurriculumSubjectWhereInput
  }

  export type ClassGroupListRelationFilter = {
    every?: ClassGroupWhereInput
    some?: ClassGroupWhereInput
    none?: ClassGroupWhereInput
  }

  export type CurriculumSubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CurriculumCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurriculumMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CurriculumMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    active?: SortOrder
    courseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    hours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectAvgOrderByAggregateInput = {
    hours?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    hours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    hours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectSumOrderByAggregateInput = {
    hours?: SortOrder
  }

  export type CurriculumScalarRelationFilter = {
    is?: CurriculumWhereInput
    isNot?: CurriculumWhereInput
  }

  export type SubjectScalarRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type CurriculumSubjectCurriculumIdSubjectIdCompoundUniqueInput = {
    curriculumId: string
    subjectId: string
  }

  export type CurriculumSubjectCountOrderByAggregateInput = {
    curriculumId?: SortOrder
    subjectId?: SortOrder
    module?: SortOrder
  }

  export type CurriculumSubjectAvgOrderByAggregateInput = {
    module?: SortOrder
  }

  export type CurriculumSubjectMaxOrderByAggregateInput = {
    curriculumId?: SortOrder
    subjectId?: SortOrder
    module?: SortOrder
  }

  export type CurriculumSubjectMinOrderByAggregateInput = {
    curriculumId?: SortOrder
    subjectId?: SortOrder
    module?: SortOrder
  }

  export type CurriculumSubjectSumOrderByAggregateInput = {
    module?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClassGroupCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    shift?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    curriculumId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    shift?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    curriculumId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassGroupMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    shift?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    curriculumId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumClassStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassStatus | EnumClassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClassStatusFilter<$PrismaModel> | $Enums.ClassStatus
  }

  export type ClassGroupScalarRelationFilter = {
    is?: ClassGroupWhereInput
    isNot?: ClassGroupWhereInput
  }

  export type ProfessorScalarRelationFilter = {
    is?: ProfessorWhereInput
    isNot?: ProfessorWhereInput
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type ScheduleRuleNullableScalarRelationFilter = {
    is?: ScheduleRuleWhereInput | null
    isNot?: ScheduleRuleWhereInput | null
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    cancelReason?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    ruleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    cancelReason?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    ruleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    status?: SortOrder
    cancelReason?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    ruleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumClassStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassStatus | EnumClassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClassStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClassStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClassStatusFilter<$PrismaModel>
    _max?: NestedEnumClassStatusFilter<$PrismaModel>
  }

  export type EnumOverrideTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OverrideType | EnumOverrideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOverrideTypeFilter<$PrismaModel> | $Enums.OverrideType
  }

  export type ScheduleOverrideCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleOverrideMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleOverrideMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumOverrideTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OverrideType | EnumOverrideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOverrideTypeWithAggregatesFilter<$PrismaModel> | $Enums.OverrideType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOverrideTypeFilter<$PrismaModel>
    _max?: NestedEnumOverrideTypeFilter<$PrismaModel>
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ScheduleRuleCountOrderByAggregateInput = {
    id?: SortOrder
    daysOfWeek?: SortOrder
    startTimeStr?: SortOrder
    endTimeStr?: SortOrder
    totalHours?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    rootRuleId?: SortOrder
    dependsOnRuleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleRuleAvgOrderByAggregateInput = {
    daysOfWeek?: SortOrder
    totalHours?: SortOrder
  }

  export type ScheduleRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    startTimeStr?: SortOrder
    endTimeStr?: SortOrder
    totalHours?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    rootRuleId?: SortOrder
    dependsOnRuleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleRuleMinOrderByAggregateInput = {
    id?: SortOrder
    startTimeStr?: SortOrder
    endTimeStr?: SortOrder
    totalHours?: SortOrder
    classGroupId?: SortOrder
    subjectId?: SortOrder
    professorId?: SortOrder
    roomId?: SortOrder
    rootRuleId?: SortOrder
    dependsOnRuleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleRuleSumOrderByAggregateInput = {
    daysOfWeek?: SortOrder
    totalHours?: SortOrder
  }

  export type ScheduleCreateNestedManyWithoutProfessorInput = {
    create?: XOR<ScheduleCreateWithoutProfessorInput, ScheduleUncheckedCreateWithoutProfessorInput> | ScheduleCreateWithoutProfessorInput[] | ScheduleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutProfessorInput | ScheduleCreateOrConnectWithoutProfessorInput[]
    createMany?: ScheduleCreateManyProfessorInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleCreateNestedManyWithoutProfessorInput = {
    create?: XOR<ScheduleRuleCreateWithoutProfessorInput, ScheduleRuleUncheckedCreateWithoutProfessorInput> | ScheduleRuleCreateWithoutProfessorInput[] | ScheduleRuleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutProfessorInput | ScheduleRuleCreateOrConnectWithoutProfessorInput[]
    createMany?: ScheduleRuleCreateManyProfessorInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<ScheduleCreateWithoutProfessorInput, ScheduleUncheckedCreateWithoutProfessorInput> | ScheduleCreateWithoutProfessorInput[] | ScheduleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutProfessorInput | ScheduleCreateOrConnectWithoutProfessorInput[]
    createMany?: ScheduleCreateManyProfessorInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleUncheckedCreateNestedManyWithoutProfessorInput = {
    create?: XOR<ScheduleRuleCreateWithoutProfessorInput, ScheduleRuleUncheckedCreateWithoutProfessorInput> | ScheduleRuleCreateWithoutProfessorInput[] | ScheduleRuleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutProfessorInput | ScheduleRuleCreateOrConnectWithoutProfessorInput[]
    createMany?: ScheduleRuleCreateManyProfessorInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ScheduleUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<ScheduleCreateWithoutProfessorInput, ScheduleUncheckedCreateWithoutProfessorInput> | ScheduleCreateWithoutProfessorInput[] | ScheduleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutProfessorInput | ScheduleCreateOrConnectWithoutProfessorInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutProfessorInput | ScheduleUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: ScheduleCreateManyProfessorInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutProfessorInput | ScheduleUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutProfessorInput | ScheduleUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutProfessorInput, ScheduleRuleUncheckedCreateWithoutProfessorInput> | ScheduleRuleCreateWithoutProfessorInput[] | ScheduleRuleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutProfessorInput | ScheduleRuleCreateOrConnectWithoutProfessorInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutProfessorInput | ScheduleRuleUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: ScheduleRuleCreateManyProfessorInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutProfessorInput | ScheduleRuleUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutProfessorInput | ScheduleRuleUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<ScheduleCreateWithoutProfessorInput, ScheduleUncheckedCreateWithoutProfessorInput> | ScheduleCreateWithoutProfessorInput[] | ScheduleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutProfessorInput | ScheduleCreateOrConnectWithoutProfessorInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutProfessorInput | ScheduleUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: ScheduleCreateManyProfessorInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutProfessorInput | ScheduleUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutProfessorInput | ScheduleUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutProfessorNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutProfessorInput, ScheduleRuleUncheckedCreateWithoutProfessorInput> | ScheduleRuleCreateWithoutProfessorInput[] | ScheduleRuleUncheckedCreateWithoutProfessorInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutProfessorInput | ScheduleRuleCreateOrConnectWithoutProfessorInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutProfessorInput | ScheduleRuleUpsertWithWhereUniqueWithoutProfessorInput[]
    createMany?: ScheduleRuleCreateManyProfessorInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutProfessorInput | ScheduleRuleUpdateWithWhereUniqueWithoutProfessorInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutProfessorInput | ScheduleRuleUpdateManyWithWhereWithoutProfessorInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleCreateNestedManyWithoutRoomInput = {
    create?: XOR<ScheduleCreateWithoutRoomInput, ScheduleUncheckedCreateWithoutRoomInput> | ScheduleCreateWithoutRoomInput[] | ScheduleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRoomInput | ScheduleCreateOrConnectWithoutRoomInput[]
    createMany?: ScheduleCreateManyRoomInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleCreateNestedManyWithoutRoomInput = {
    create?: XOR<ScheduleRuleCreateWithoutRoomInput, ScheduleRuleUncheckedCreateWithoutRoomInput> | ScheduleRuleCreateWithoutRoomInput[] | ScheduleRuleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRoomInput | ScheduleRuleCreateOrConnectWithoutRoomInput[]
    createMany?: ScheduleRuleCreateManyRoomInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ScheduleCreateWithoutRoomInput, ScheduleUncheckedCreateWithoutRoomInput> | ScheduleCreateWithoutRoomInput[] | ScheduleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRoomInput | ScheduleCreateOrConnectWithoutRoomInput[]
    createMany?: ScheduleCreateManyRoomInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ScheduleRuleCreateWithoutRoomInput, ScheduleRuleUncheckedCreateWithoutRoomInput> | ScheduleRuleCreateWithoutRoomInput[] | ScheduleRuleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRoomInput | ScheduleRuleCreateOrConnectWithoutRoomInput[]
    createMany?: ScheduleRuleCreateManyRoomInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ScheduleUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ScheduleCreateWithoutRoomInput, ScheduleUncheckedCreateWithoutRoomInput> | ScheduleCreateWithoutRoomInput[] | ScheduleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRoomInput | ScheduleCreateOrConnectWithoutRoomInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutRoomInput | ScheduleUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ScheduleCreateManyRoomInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutRoomInput | ScheduleUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutRoomInput | ScheduleUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutRoomInput, ScheduleRuleUncheckedCreateWithoutRoomInput> | ScheduleRuleCreateWithoutRoomInput[] | ScheduleRuleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRoomInput | ScheduleRuleCreateOrConnectWithoutRoomInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutRoomInput | ScheduleRuleUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ScheduleRuleCreateManyRoomInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutRoomInput | ScheduleRuleUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutRoomInput | ScheduleRuleUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ScheduleCreateWithoutRoomInput, ScheduleUncheckedCreateWithoutRoomInput> | ScheduleCreateWithoutRoomInput[] | ScheduleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRoomInput | ScheduleCreateOrConnectWithoutRoomInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutRoomInput | ScheduleUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ScheduleCreateManyRoomInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutRoomInput | ScheduleUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutRoomInput | ScheduleUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutRoomInput, ScheduleRuleUncheckedCreateWithoutRoomInput> | ScheduleRuleCreateWithoutRoomInput[] | ScheduleRuleUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRoomInput | ScheduleRuleCreateOrConnectWithoutRoomInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutRoomInput | ScheduleRuleUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ScheduleRuleCreateManyRoomInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutRoomInput | ScheduleRuleUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutRoomInput | ScheduleRuleUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type CurriculumCreateNestedManyWithoutCourseInput = {
    create?: XOR<CurriculumCreateWithoutCourseInput, CurriculumUncheckedCreateWithoutCourseInput> | CurriculumCreateWithoutCourseInput[] | CurriculumUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CurriculumCreateOrConnectWithoutCourseInput | CurriculumCreateOrConnectWithoutCourseInput[]
    createMany?: CurriculumCreateManyCourseInputEnvelope
    connect?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
  }

  export type CurriculumUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CurriculumCreateWithoutCourseInput, CurriculumUncheckedCreateWithoutCourseInput> | CurriculumCreateWithoutCourseInput[] | CurriculumUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CurriculumCreateOrConnectWithoutCourseInput | CurriculumCreateOrConnectWithoutCourseInput[]
    createMany?: CurriculumCreateManyCourseInputEnvelope
    connect?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
  }

  export type CurriculumUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CurriculumCreateWithoutCourseInput, CurriculumUncheckedCreateWithoutCourseInput> | CurriculumCreateWithoutCourseInput[] | CurriculumUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CurriculumCreateOrConnectWithoutCourseInput | CurriculumCreateOrConnectWithoutCourseInput[]
    upsert?: CurriculumUpsertWithWhereUniqueWithoutCourseInput | CurriculumUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CurriculumCreateManyCourseInputEnvelope
    set?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    disconnect?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    delete?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    connect?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    update?: CurriculumUpdateWithWhereUniqueWithoutCourseInput | CurriculumUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CurriculumUpdateManyWithWhereWithoutCourseInput | CurriculumUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CurriculumScalarWhereInput | CurriculumScalarWhereInput[]
  }

  export type CurriculumUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CurriculumCreateWithoutCourseInput, CurriculumUncheckedCreateWithoutCourseInput> | CurriculumCreateWithoutCourseInput[] | CurriculumUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CurriculumCreateOrConnectWithoutCourseInput | CurriculumCreateOrConnectWithoutCourseInput[]
    upsert?: CurriculumUpsertWithWhereUniqueWithoutCourseInput | CurriculumUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CurriculumCreateManyCourseInputEnvelope
    set?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    disconnect?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    delete?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    connect?: CurriculumWhereUniqueInput | CurriculumWhereUniqueInput[]
    update?: CurriculumUpdateWithWhereUniqueWithoutCourseInput | CurriculumUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CurriculumUpdateManyWithWhereWithoutCourseInput | CurriculumUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CurriculumScalarWhereInput | CurriculumScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutCurriculumsInput = {
    create?: XOR<CourseCreateWithoutCurriculumsInput, CourseUncheckedCreateWithoutCurriculumsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCurriculumsInput
    connect?: CourseWhereUniqueInput
  }

  export type CurriculumSubjectCreateNestedManyWithoutCurriculumInput = {
    create?: XOR<CurriculumSubjectCreateWithoutCurriculumInput, CurriculumSubjectUncheckedCreateWithoutCurriculumInput> | CurriculumSubjectCreateWithoutCurriculumInput[] | CurriculumSubjectUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutCurriculumInput | CurriculumSubjectCreateOrConnectWithoutCurriculumInput[]
    createMany?: CurriculumSubjectCreateManyCurriculumInputEnvelope
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
  }

  export type ClassGroupCreateNestedManyWithoutCurriculumInput = {
    create?: XOR<ClassGroupCreateWithoutCurriculumInput, ClassGroupUncheckedCreateWithoutCurriculumInput> | ClassGroupCreateWithoutCurriculumInput[] | ClassGroupUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: ClassGroupCreateOrConnectWithoutCurriculumInput | ClassGroupCreateOrConnectWithoutCurriculumInput[]
    createMany?: ClassGroupCreateManyCurriculumInputEnvelope
    connect?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
  }

  export type CurriculumSubjectUncheckedCreateNestedManyWithoutCurriculumInput = {
    create?: XOR<CurriculumSubjectCreateWithoutCurriculumInput, CurriculumSubjectUncheckedCreateWithoutCurriculumInput> | CurriculumSubjectCreateWithoutCurriculumInput[] | CurriculumSubjectUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutCurriculumInput | CurriculumSubjectCreateOrConnectWithoutCurriculumInput[]
    createMany?: CurriculumSubjectCreateManyCurriculumInputEnvelope
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
  }

  export type ClassGroupUncheckedCreateNestedManyWithoutCurriculumInput = {
    create?: XOR<ClassGroupCreateWithoutCurriculumInput, ClassGroupUncheckedCreateWithoutCurriculumInput> | ClassGroupCreateWithoutCurriculumInput[] | ClassGroupUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: ClassGroupCreateOrConnectWithoutCurriculumInput | ClassGroupCreateOrConnectWithoutCurriculumInput[]
    createMany?: ClassGroupCreateManyCurriculumInputEnvelope
    connect?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CourseUpdateOneRequiredWithoutCurriculumsNestedInput = {
    create?: XOR<CourseCreateWithoutCurriculumsInput, CourseUncheckedCreateWithoutCurriculumsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCurriculumsInput
    upsert?: CourseUpsertWithoutCurriculumsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutCurriculumsInput, CourseUpdateWithoutCurriculumsInput>, CourseUncheckedUpdateWithoutCurriculumsInput>
  }

  export type CurriculumSubjectUpdateManyWithoutCurriculumNestedInput = {
    create?: XOR<CurriculumSubjectCreateWithoutCurriculumInput, CurriculumSubjectUncheckedCreateWithoutCurriculumInput> | CurriculumSubjectCreateWithoutCurriculumInput[] | CurriculumSubjectUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutCurriculumInput | CurriculumSubjectCreateOrConnectWithoutCurriculumInput[]
    upsert?: CurriculumSubjectUpsertWithWhereUniqueWithoutCurriculumInput | CurriculumSubjectUpsertWithWhereUniqueWithoutCurriculumInput[]
    createMany?: CurriculumSubjectCreateManyCurriculumInputEnvelope
    set?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    disconnect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    delete?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    update?: CurriculumSubjectUpdateWithWhereUniqueWithoutCurriculumInput | CurriculumSubjectUpdateWithWhereUniqueWithoutCurriculumInput[]
    updateMany?: CurriculumSubjectUpdateManyWithWhereWithoutCurriculumInput | CurriculumSubjectUpdateManyWithWhereWithoutCurriculumInput[]
    deleteMany?: CurriculumSubjectScalarWhereInput | CurriculumSubjectScalarWhereInput[]
  }

  export type ClassGroupUpdateManyWithoutCurriculumNestedInput = {
    create?: XOR<ClassGroupCreateWithoutCurriculumInput, ClassGroupUncheckedCreateWithoutCurriculumInput> | ClassGroupCreateWithoutCurriculumInput[] | ClassGroupUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: ClassGroupCreateOrConnectWithoutCurriculumInput | ClassGroupCreateOrConnectWithoutCurriculumInput[]
    upsert?: ClassGroupUpsertWithWhereUniqueWithoutCurriculumInput | ClassGroupUpsertWithWhereUniqueWithoutCurriculumInput[]
    createMany?: ClassGroupCreateManyCurriculumInputEnvelope
    set?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    disconnect?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    delete?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    connect?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    update?: ClassGroupUpdateWithWhereUniqueWithoutCurriculumInput | ClassGroupUpdateWithWhereUniqueWithoutCurriculumInput[]
    updateMany?: ClassGroupUpdateManyWithWhereWithoutCurriculumInput | ClassGroupUpdateManyWithWhereWithoutCurriculumInput[]
    deleteMany?: ClassGroupScalarWhereInput | ClassGroupScalarWhereInput[]
  }

  export type CurriculumSubjectUncheckedUpdateManyWithoutCurriculumNestedInput = {
    create?: XOR<CurriculumSubjectCreateWithoutCurriculumInput, CurriculumSubjectUncheckedCreateWithoutCurriculumInput> | CurriculumSubjectCreateWithoutCurriculumInput[] | CurriculumSubjectUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutCurriculumInput | CurriculumSubjectCreateOrConnectWithoutCurriculumInput[]
    upsert?: CurriculumSubjectUpsertWithWhereUniqueWithoutCurriculumInput | CurriculumSubjectUpsertWithWhereUniqueWithoutCurriculumInput[]
    createMany?: CurriculumSubjectCreateManyCurriculumInputEnvelope
    set?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    disconnect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    delete?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    update?: CurriculumSubjectUpdateWithWhereUniqueWithoutCurriculumInput | CurriculumSubjectUpdateWithWhereUniqueWithoutCurriculumInput[]
    updateMany?: CurriculumSubjectUpdateManyWithWhereWithoutCurriculumInput | CurriculumSubjectUpdateManyWithWhereWithoutCurriculumInput[]
    deleteMany?: CurriculumSubjectScalarWhereInput | CurriculumSubjectScalarWhereInput[]
  }

  export type ClassGroupUncheckedUpdateManyWithoutCurriculumNestedInput = {
    create?: XOR<ClassGroupCreateWithoutCurriculumInput, ClassGroupUncheckedCreateWithoutCurriculumInput> | ClassGroupCreateWithoutCurriculumInput[] | ClassGroupUncheckedCreateWithoutCurriculumInput[]
    connectOrCreate?: ClassGroupCreateOrConnectWithoutCurriculumInput | ClassGroupCreateOrConnectWithoutCurriculumInput[]
    upsert?: ClassGroupUpsertWithWhereUniqueWithoutCurriculumInput | ClassGroupUpsertWithWhereUniqueWithoutCurriculumInput[]
    createMany?: ClassGroupCreateManyCurriculumInputEnvelope
    set?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    disconnect?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    delete?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    connect?: ClassGroupWhereUniqueInput | ClassGroupWhereUniqueInput[]
    update?: ClassGroupUpdateWithWhereUniqueWithoutCurriculumInput | ClassGroupUpdateWithWhereUniqueWithoutCurriculumInput[]
    updateMany?: ClassGroupUpdateManyWithWhereWithoutCurriculumInput | ClassGroupUpdateManyWithWhereWithoutCurriculumInput[]
    deleteMany?: ClassGroupScalarWhereInput | ClassGroupScalarWhereInput[]
  }

  export type CurriculumSubjectCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CurriculumSubjectCreateWithoutSubjectInput, CurriculumSubjectUncheckedCreateWithoutSubjectInput> | CurriculumSubjectCreateWithoutSubjectInput[] | CurriculumSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutSubjectInput | CurriculumSubjectCreateOrConnectWithoutSubjectInput[]
    createMany?: CurriculumSubjectCreateManySubjectInputEnvelope
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
  }

  export type ScheduleCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScheduleCreateWithoutSubjectInput, ScheduleUncheckedCreateWithoutSubjectInput> | ScheduleCreateWithoutSubjectInput[] | ScheduleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSubjectInput | ScheduleCreateOrConnectWithoutSubjectInput[]
    createMany?: ScheduleCreateManySubjectInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScheduleRuleCreateWithoutSubjectInput, ScheduleRuleUncheckedCreateWithoutSubjectInput> | ScheduleRuleCreateWithoutSubjectInput[] | ScheduleRuleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutSubjectInput | ScheduleRuleCreateOrConnectWithoutSubjectInput[]
    createMany?: ScheduleRuleCreateManySubjectInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type CurriculumSubjectUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CurriculumSubjectCreateWithoutSubjectInput, CurriculumSubjectUncheckedCreateWithoutSubjectInput> | CurriculumSubjectCreateWithoutSubjectInput[] | CurriculumSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutSubjectInput | CurriculumSubjectCreateOrConnectWithoutSubjectInput[]
    createMany?: CurriculumSubjectCreateManySubjectInputEnvelope
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScheduleCreateWithoutSubjectInput, ScheduleUncheckedCreateWithoutSubjectInput> | ScheduleCreateWithoutSubjectInput[] | ScheduleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSubjectInput | ScheduleCreateOrConnectWithoutSubjectInput[]
    createMany?: ScheduleCreateManySubjectInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScheduleRuleCreateWithoutSubjectInput, ScheduleRuleUncheckedCreateWithoutSubjectInput> | ScheduleRuleCreateWithoutSubjectInput[] | ScheduleRuleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutSubjectInput | ScheduleRuleCreateOrConnectWithoutSubjectInput[]
    createMany?: ScheduleRuleCreateManySubjectInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type CurriculumSubjectUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CurriculumSubjectCreateWithoutSubjectInput, CurriculumSubjectUncheckedCreateWithoutSubjectInput> | CurriculumSubjectCreateWithoutSubjectInput[] | CurriculumSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutSubjectInput | CurriculumSubjectCreateOrConnectWithoutSubjectInput[]
    upsert?: CurriculumSubjectUpsertWithWhereUniqueWithoutSubjectInput | CurriculumSubjectUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CurriculumSubjectCreateManySubjectInputEnvelope
    set?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    disconnect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    delete?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    update?: CurriculumSubjectUpdateWithWhereUniqueWithoutSubjectInput | CurriculumSubjectUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CurriculumSubjectUpdateManyWithWhereWithoutSubjectInput | CurriculumSubjectUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CurriculumSubjectScalarWhereInput | CurriculumSubjectScalarWhereInput[]
  }

  export type ScheduleUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScheduleCreateWithoutSubjectInput, ScheduleUncheckedCreateWithoutSubjectInput> | ScheduleCreateWithoutSubjectInput[] | ScheduleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSubjectInput | ScheduleCreateOrConnectWithoutSubjectInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutSubjectInput | ScheduleUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScheduleCreateManySubjectInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutSubjectInput | ScheduleUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutSubjectInput | ScheduleUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutSubjectInput, ScheduleRuleUncheckedCreateWithoutSubjectInput> | ScheduleRuleCreateWithoutSubjectInput[] | ScheduleRuleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutSubjectInput | ScheduleRuleCreateOrConnectWithoutSubjectInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutSubjectInput | ScheduleRuleUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScheduleRuleCreateManySubjectInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutSubjectInput | ScheduleRuleUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutSubjectInput | ScheduleRuleUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type CurriculumSubjectUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CurriculumSubjectCreateWithoutSubjectInput, CurriculumSubjectUncheckedCreateWithoutSubjectInput> | CurriculumSubjectCreateWithoutSubjectInput[] | CurriculumSubjectUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CurriculumSubjectCreateOrConnectWithoutSubjectInput | CurriculumSubjectCreateOrConnectWithoutSubjectInput[]
    upsert?: CurriculumSubjectUpsertWithWhereUniqueWithoutSubjectInput | CurriculumSubjectUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CurriculumSubjectCreateManySubjectInputEnvelope
    set?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    disconnect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    delete?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    connect?: CurriculumSubjectWhereUniqueInput | CurriculumSubjectWhereUniqueInput[]
    update?: CurriculumSubjectUpdateWithWhereUniqueWithoutSubjectInput | CurriculumSubjectUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CurriculumSubjectUpdateManyWithWhereWithoutSubjectInput | CurriculumSubjectUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CurriculumSubjectScalarWhereInput | CurriculumSubjectScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScheduleCreateWithoutSubjectInput, ScheduleUncheckedCreateWithoutSubjectInput> | ScheduleCreateWithoutSubjectInput[] | ScheduleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutSubjectInput | ScheduleCreateOrConnectWithoutSubjectInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutSubjectInput | ScheduleUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScheduleCreateManySubjectInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutSubjectInput | ScheduleUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutSubjectInput | ScheduleUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutSubjectInput, ScheduleRuleUncheckedCreateWithoutSubjectInput> | ScheduleRuleCreateWithoutSubjectInput[] | ScheduleRuleUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutSubjectInput | ScheduleRuleCreateOrConnectWithoutSubjectInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutSubjectInput | ScheduleRuleUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScheduleRuleCreateManySubjectInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutSubjectInput | ScheduleRuleUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutSubjectInput | ScheduleRuleUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type CurriculumCreateNestedOneWithoutSubjectsInput = {
    create?: XOR<CurriculumCreateWithoutSubjectsInput, CurriculumUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: CurriculumCreateOrConnectWithoutSubjectsInput
    connect?: CurriculumWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutCurriculumsInput = {
    create?: XOR<SubjectCreateWithoutCurriculumsInput, SubjectUncheckedCreateWithoutCurriculumsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCurriculumsInput
    connect?: SubjectWhereUniqueInput
  }

  export type CurriculumUpdateOneRequiredWithoutSubjectsNestedInput = {
    create?: XOR<CurriculumCreateWithoutSubjectsInput, CurriculumUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: CurriculumCreateOrConnectWithoutSubjectsInput
    upsert?: CurriculumUpsertWithoutSubjectsInput
    connect?: CurriculumWhereUniqueInput
    update?: XOR<XOR<CurriculumUpdateToOneWithWhereWithoutSubjectsInput, CurriculumUpdateWithoutSubjectsInput>, CurriculumUncheckedUpdateWithoutSubjectsInput>
  }

  export type SubjectUpdateOneRequiredWithoutCurriculumsNestedInput = {
    create?: XOR<SubjectCreateWithoutCurriculumsInput, SubjectUncheckedCreateWithoutCurriculumsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCurriculumsInput
    upsert?: SubjectUpsertWithoutCurriculumsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutCurriculumsInput, SubjectUpdateWithoutCurriculumsInput>, SubjectUncheckedUpdateWithoutCurriculumsInput>
  }

  export type CurriculumCreateNestedOneWithoutClassGroupsInput = {
    create?: XOR<CurriculumCreateWithoutClassGroupsInput, CurriculumUncheckedCreateWithoutClassGroupsInput>
    connectOrCreate?: CurriculumCreateOrConnectWithoutClassGroupsInput
    connect?: CurriculumWhereUniqueInput
  }

  export type ScheduleCreateNestedManyWithoutClassGroupInput = {
    create?: XOR<ScheduleCreateWithoutClassGroupInput, ScheduleUncheckedCreateWithoutClassGroupInput> | ScheduleCreateWithoutClassGroupInput[] | ScheduleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutClassGroupInput | ScheduleCreateOrConnectWithoutClassGroupInput[]
    createMany?: ScheduleCreateManyClassGroupInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleCreateNestedManyWithoutClassGroupInput = {
    create?: XOR<ScheduleRuleCreateWithoutClassGroupInput, ScheduleRuleUncheckedCreateWithoutClassGroupInput> | ScheduleRuleCreateWithoutClassGroupInput[] | ScheduleRuleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutClassGroupInput | ScheduleRuleCreateOrConnectWithoutClassGroupInput[]
    createMany?: ScheduleRuleCreateManyClassGroupInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutClassGroupInput = {
    create?: XOR<ScheduleCreateWithoutClassGroupInput, ScheduleUncheckedCreateWithoutClassGroupInput> | ScheduleCreateWithoutClassGroupInput[] | ScheduleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutClassGroupInput | ScheduleCreateOrConnectWithoutClassGroupInput[]
    createMany?: ScheduleCreateManyClassGroupInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleUncheckedCreateNestedManyWithoutClassGroupInput = {
    create?: XOR<ScheduleRuleCreateWithoutClassGroupInput, ScheduleRuleUncheckedCreateWithoutClassGroupInput> | ScheduleRuleCreateWithoutClassGroupInput[] | ScheduleRuleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutClassGroupInput | ScheduleRuleCreateOrConnectWithoutClassGroupInput[]
    createMany?: ScheduleRuleCreateManyClassGroupInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CurriculumUpdateOneRequiredWithoutClassGroupsNestedInput = {
    create?: XOR<CurriculumCreateWithoutClassGroupsInput, CurriculumUncheckedCreateWithoutClassGroupsInput>
    connectOrCreate?: CurriculumCreateOrConnectWithoutClassGroupsInput
    upsert?: CurriculumUpsertWithoutClassGroupsInput
    connect?: CurriculumWhereUniqueInput
    update?: XOR<XOR<CurriculumUpdateToOneWithWhereWithoutClassGroupsInput, CurriculumUpdateWithoutClassGroupsInput>, CurriculumUncheckedUpdateWithoutClassGroupsInput>
  }

  export type ScheduleUpdateManyWithoutClassGroupNestedInput = {
    create?: XOR<ScheduleCreateWithoutClassGroupInput, ScheduleUncheckedCreateWithoutClassGroupInput> | ScheduleCreateWithoutClassGroupInput[] | ScheduleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutClassGroupInput | ScheduleCreateOrConnectWithoutClassGroupInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutClassGroupInput | ScheduleUpsertWithWhereUniqueWithoutClassGroupInput[]
    createMany?: ScheduleCreateManyClassGroupInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutClassGroupInput | ScheduleUpdateWithWhereUniqueWithoutClassGroupInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutClassGroupInput | ScheduleUpdateManyWithWhereWithoutClassGroupInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUpdateManyWithoutClassGroupNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutClassGroupInput, ScheduleRuleUncheckedCreateWithoutClassGroupInput> | ScheduleRuleCreateWithoutClassGroupInput[] | ScheduleRuleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutClassGroupInput | ScheduleRuleCreateOrConnectWithoutClassGroupInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutClassGroupInput | ScheduleRuleUpsertWithWhereUniqueWithoutClassGroupInput[]
    createMany?: ScheduleRuleCreateManyClassGroupInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutClassGroupInput | ScheduleRuleUpdateWithWhereUniqueWithoutClassGroupInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutClassGroupInput | ScheduleRuleUpdateManyWithWhereWithoutClassGroupInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutClassGroupNestedInput = {
    create?: XOR<ScheduleCreateWithoutClassGroupInput, ScheduleUncheckedCreateWithoutClassGroupInput> | ScheduleCreateWithoutClassGroupInput[] | ScheduleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutClassGroupInput | ScheduleCreateOrConnectWithoutClassGroupInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutClassGroupInput | ScheduleUpsertWithWhereUniqueWithoutClassGroupInput[]
    createMany?: ScheduleCreateManyClassGroupInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutClassGroupInput | ScheduleUpdateWithWhereUniqueWithoutClassGroupInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutClassGroupInput | ScheduleUpdateManyWithWhereWithoutClassGroupInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutClassGroupNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutClassGroupInput, ScheduleRuleUncheckedCreateWithoutClassGroupInput> | ScheduleRuleCreateWithoutClassGroupInput[] | ScheduleRuleUncheckedCreateWithoutClassGroupInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutClassGroupInput | ScheduleRuleCreateOrConnectWithoutClassGroupInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutClassGroupInput | ScheduleRuleUpsertWithWhereUniqueWithoutClassGroupInput[]
    createMany?: ScheduleRuleCreateManyClassGroupInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutClassGroupInput | ScheduleRuleUpdateWithWhereUniqueWithoutClassGroupInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutClassGroupInput | ScheduleRuleUpdateManyWithWhereWithoutClassGroupInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ClassGroupCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<ClassGroupCreateWithoutSchedulesInput, ClassGroupUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ClassGroupCreateOrConnectWithoutSchedulesInput
    connect?: ClassGroupWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<SubjectCreateWithoutSchedulesInput, SubjectUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutSchedulesInput
    connect?: SubjectWhereUniqueInput
  }

  export type ProfessorCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<ProfessorCreateWithoutSchedulesInput, ProfessorUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutSchedulesInput
    connect?: ProfessorWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<RoomCreateWithoutSchedulesInput, RoomUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutSchedulesInput
    connect?: RoomWhereUniqueInput
  }

  export type ScheduleRuleCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<ScheduleRuleCreateWithoutSchedulesInput, ScheduleRuleUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutSchedulesInput
    connect?: ScheduleRuleWhereUniqueInput
  }

  export type EnumClassStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClassStatus
  }

  export type ClassGroupUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<ClassGroupCreateWithoutSchedulesInput, ClassGroupUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ClassGroupCreateOrConnectWithoutSchedulesInput
    upsert?: ClassGroupUpsertWithoutSchedulesInput
    connect?: ClassGroupWhereUniqueInput
    update?: XOR<XOR<ClassGroupUpdateToOneWithWhereWithoutSchedulesInput, ClassGroupUpdateWithoutSchedulesInput>, ClassGroupUncheckedUpdateWithoutSchedulesInput>
  }

  export type SubjectUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<SubjectCreateWithoutSchedulesInput, SubjectUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutSchedulesInput
    upsert?: SubjectUpsertWithoutSchedulesInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutSchedulesInput, SubjectUpdateWithoutSchedulesInput>, SubjectUncheckedUpdateWithoutSchedulesInput>
  }

  export type ProfessorUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<ProfessorCreateWithoutSchedulesInput, ProfessorUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutSchedulesInput
    upsert?: ProfessorUpsertWithoutSchedulesInput
    connect?: ProfessorWhereUniqueInput
    update?: XOR<XOR<ProfessorUpdateToOneWithWhereWithoutSchedulesInput, ProfessorUpdateWithoutSchedulesInput>, ProfessorUncheckedUpdateWithoutSchedulesInput>
  }

  export type RoomUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<RoomCreateWithoutSchedulesInput, RoomUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutSchedulesInput
    upsert?: RoomUpsertWithoutSchedulesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutSchedulesInput, RoomUpdateWithoutSchedulesInput>, RoomUncheckedUpdateWithoutSchedulesInput>
  }

  export type ScheduleRuleUpdateOneWithoutSchedulesNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutSchedulesInput, ScheduleRuleUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutSchedulesInput
    upsert?: ScheduleRuleUpsertWithoutSchedulesInput
    disconnect?: ScheduleRuleWhereInput | boolean
    delete?: ScheduleRuleWhereInput | boolean
    connect?: ScheduleRuleWhereUniqueInput
    update?: XOR<XOR<ScheduleRuleUpdateToOneWithWhereWithoutSchedulesInput, ScheduleRuleUpdateWithoutSchedulesInput>, ScheduleRuleUncheckedUpdateWithoutSchedulesInput>
  }

  export type EnumOverrideTypeFieldUpdateOperationsInput = {
    set?: $Enums.OverrideType
  }

  export type ScheduleRuleCreatedaysOfWeekInput = {
    set: number[]
  }

  export type ClassGroupCreateNestedOneWithoutScheduleRulesInput = {
    create?: XOR<ClassGroupCreateWithoutScheduleRulesInput, ClassGroupUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: ClassGroupCreateOrConnectWithoutScheduleRulesInput
    connect?: ClassGroupWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutScheduleRulesInput = {
    create?: XOR<SubjectCreateWithoutScheduleRulesInput, SubjectUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutScheduleRulesInput
    connect?: SubjectWhereUniqueInput
  }

  export type ProfessorCreateNestedOneWithoutScheduleRulesInput = {
    create?: XOR<ProfessorCreateWithoutScheduleRulesInput, ProfessorUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutScheduleRulesInput
    connect?: ProfessorWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutScheduleRulesInput = {
    create?: XOR<RoomCreateWithoutScheduleRulesInput, RoomUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutScheduleRulesInput
    connect?: RoomWhereUniqueInput
  }

  export type ScheduleCreateNestedManyWithoutRuleInput = {
    create?: XOR<ScheduleCreateWithoutRuleInput, ScheduleUncheckedCreateWithoutRuleInput> | ScheduleCreateWithoutRuleInput[] | ScheduleUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRuleInput | ScheduleCreateOrConnectWithoutRuleInput[]
    createMany?: ScheduleCreateManyRuleInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleCreateNestedOneWithoutChildRulesInput = {
    create?: XOR<ScheduleRuleCreateWithoutChildRulesInput, ScheduleRuleUncheckedCreateWithoutChildRulesInput>
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutChildRulesInput
    connect?: ScheduleRuleWhereUniqueInput
  }

  export type ScheduleRuleCreateNestedManyWithoutRootRuleInput = {
    create?: XOR<ScheduleRuleCreateWithoutRootRuleInput, ScheduleRuleUncheckedCreateWithoutRootRuleInput> | ScheduleRuleCreateWithoutRootRuleInput[] | ScheduleRuleUncheckedCreateWithoutRootRuleInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRootRuleInput | ScheduleRuleCreateOrConnectWithoutRootRuleInput[]
    createMany?: ScheduleRuleCreateManyRootRuleInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleRuleCreateNestedOneWithoutDependentRulesInput = {
    create?: XOR<ScheduleRuleCreateWithoutDependentRulesInput, ScheduleRuleUncheckedCreateWithoutDependentRulesInput>
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutDependentRulesInput
    connect?: ScheduleRuleWhereUniqueInput
  }

  export type ScheduleRuleCreateNestedManyWithoutDependsOnInput = {
    create?: XOR<ScheduleRuleCreateWithoutDependsOnInput, ScheduleRuleUncheckedCreateWithoutDependsOnInput> | ScheduleRuleCreateWithoutDependsOnInput[] | ScheduleRuleUncheckedCreateWithoutDependsOnInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutDependsOnInput | ScheduleRuleCreateOrConnectWithoutDependsOnInput[]
    createMany?: ScheduleRuleCreateManyDependsOnInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutRuleInput = {
    create?: XOR<ScheduleCreateWithoutRuleInput, ScheduleUncheckedCreateWithoutRuleInput> | ScheduleCreateWithoutRuleInput[] | ScheduleUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRuleInput | ScheduleCreateOrConnectWithoutRuleInput[]
    createMany?: ScheduleCreateManyRuleInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput = {
    create?: XOR<ScheduleRuleCreateWithoutRootRuleInput, ScheduleRuleUncheckedCreateWithoutRootRuleInput> | ScheduleRuleCreateWithoutRootRuleInput[] | ScheduleRuleUncheckedCreateWithoutRootRuleInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRootRuleInput | ScheduleRuleCreateOrConnectWithoutRootRuleInput[]
    createMany?: ScheduleRuleCreateManyRootRuleInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput = {
    create?: XOR<ScheduleRuleCreateWithoutDependsOnInput, ScheduleRuleUncheckedCreateWithoutDependsOnInput> | ScheduleRuleCreateWithoutDependsOnInput[] | ScheduleRuleUncheckedCreateWithoutDependsOnInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutDependsOnInput | ScheduleRuleCreateOrConnectWithoutDependsOnInput[]
    createMany?: ScheduleRuleCreateManyDependsOnInputEnvelope
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
  }

  export type ScheduleRuleUpdatedaysOfWeekInput = {
    set?: number[]
    push?: number | number[]
  }

  export type ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput = {
    create?: XOR<ClassGroupCreateWithoutScheduleRulesInput, ClassGroupUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: ClassGroupCreateOrConnectWithoutScheduleRulesInput
    upsert?: ClassGroupUpsertWithoutScheduleRulesInput
    connect?: ClassGroupWhereUniqueInput
    update?: XOR<XOR<ClassGroupUpdateToOneWithWhereWithoutScheduleRulesInput, ClassGroupUpdateWithoutScheduleRulesInput>, ClassGroupUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput = {
    create?: XOR<SubjectCreateWithoutScheduleRulesInput, SubjectUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutScheduleRulesInput
    upsert?: SubjectUpsertWithoutScheduleRulesInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutScheduleRulesInput, SubjectUpdateWithoutScheduleRulesInput>, SubjectUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput = {
    create?: XOR<ProfessorCreateWithoutScheduleRulesInput, ProfessorUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: ProfessorCreateOrConnectWithoutScheduleRulesInput
    upsert?: ProfessorUpsertWithoutScheduleRulesInput
    connect?: ProfessorWhereUniqueInput
    update?: XOR<XOR<ProfessorUpdateToOneWithWhereWithoutScheduleRulesInput, ProfessorUpdateWithoutScheduleRulesInput>, ProfessorUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type RoomUpdateOneRequiredWithoutScheduleRulesNestedInput = {
    create?: XOR<RoomCreateWithoutScheduleRulesInput, RoomUncheckedCreateWithoutScheduleRulesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutScheduleRulesInput
    upsert?: RoomUpsertWithoutScheduleRulesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutScheduleRulesInput, RoomUpdateWithoutScheduleRulesInput>, RoomUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type ScheduleUpdateManyWithoutRuleNestedInput = {
    create?: XOR<ScheduleCreateWithoutRuleInput, ScheduleUncheckedCreateWithoutRuleInput> | ScheduleCreateWithoutRuleInput[] | ScheduleUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRuleInput | ScheduleCreateOrConnectWithoutRuleInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutRuleInput | ScheduleUpsertWithWhereUniqueWithoutRuleInput[]
    createMany?: ScheduleCreateManyRuleInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutRuleInput | ScheduleUpdateWithWhereUniqueWithoutRuleInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutRuleInput | ScheduleUpdateManyWithWhereWithoutRuleInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUpdateOneWithoutChildRulesNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutChildRulesInput, ScheduleRuleUncheckedCreateWithoutChildRulesInput>
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutChildRulesInput
    upsert?: ScheduleRuleUpsertWithoutChildRulesInput
    disconnect?: ScheduleRuleWhereInput | boolean
    delete?: ScheduleRuleWhereInput | boolean
    connect?: ScheduleRuleWhereUniqueInput
    update?: XOR<XOR<ScheduleRuleUpdateToOneWithWhereWithoutChildRulesInput, ScheduleRuleUpdateWithoutChildRulesInput>, ScheduleRuleUncheckedUpdateWithoutChildRulesInput>
  }

  export type ScheduleRuleUpdateManyWithoutRootRuleNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutRootRuleInput, ScheduleRuleUncheckedCreateWithoutRootRuleInput> | ScheduleRuleCreateWithoutRootRuleInput[] | ScheduleRuleUncheckedCreateWithoutRootRuleInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRootRuleInput | ScheduleRuleCreateOrConnectWithoutRootRuleInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutRootRuleInput | ScheduleRuleUpsertWithWhereUniqueWithoutRootRuleInput[]
    createMany?: ScheduleRuleCreateManyRootRuleInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutRootRuleInput | ScheduleRuleUpdateWithWhereUniqueWithoutRootRuleInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutRootRuleInput | ScheduleRuleUpdateManyWithWhereWithoutRootRuleInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleRuleUpdateOneWithoutDependentRulesNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutDependentRulesInput, ScheduleRuleUncheckedCreateWithoutDependentRulesInput>
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutDependentRulesInput
    upsert?: ScheduleRuleUpsertWithoutDependentRulesInput
    disconnect?: ScheduleRuleWhereInput | boolean
    delete?: ScheduleRuleWhereInput | boolean
    connect?: ScheduleRuleWhereUniqueInput
    update?: XOR<XOR<ScheduleRuleUpdateToOneWithWhereWithoutDependentRulesInput, ScheduleRuleUpdateWithoutDependentRulesInput>, ScheduleRuleUncheckedUpdateWithoutDependentRulesInput>
  }

  export type ScheduleRuleUpdateManyWithoutDependsOnNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutDependsOnInput, ScheduleRuleUncheckedCreateWithoutDependsOnInput> | ScheduleRuleCreateWithoutDependsOnInput[] | ScheduleRuleUncheckedCreateWithoutDependsOnInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutDependsOnInput | ScheduleRuleCreateOrConnectWithoutDependsOnInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutDependsOnInput | ScheduleRuleUpsertWithWhereUniqueWithoutDependsOnInput[]
    createMany?: ScheduleRuleCreateManyDependsOnInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutDependsOnInput | ScheduleRuleUpdateWithWhereUniqueWithoutDependsOnInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutDependsOnInput | ScheduleRuleUpdateManyWithWhereWithoutDependsOnInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutRuleNestedInput = {
    create?: XOR<ScheduleCreateWithoutRuleInput, ScheduleUncheckedCreateWithoutRuleInput> | ScheduleCreateWithoutRuleInput[] | ScheduleUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRuleInput | ScheduleCreateOrConnectWithoutRuleInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutRuleInput | ScheduleUpsertWithWhereUniqueWithoutRuleInput[]
    createMany?: ScheduleCreateManyRuleInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutRuleInput | ScheduleUpdateWithWhereUniqueWithoutRuleInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutRuleInput | ScheduleUpdateManyWithWhereWithoutRuleInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutRootRuleInput, ScheduleRuleUncheckedCreateWithoutRootRuleInput> | ScheduleRuleCreateWithoutRootRuleInput[] | ScheduleRuleUncheckedCreateWithoutRootRuleInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutRootRuleInput | ScheduleRuleCreateOrConnectWithoutRootRuleInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutRootRuleInput | ScheduleRuleUpsertWithWhereUniqueWithoutRootRuleInput[]
    createMany?: ScheduleRuleCreateManyRootRuleInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutRootRuleInput | ScheduleRuleUpdateWithWhereUniqueWithoutRootRuleInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutRootRuleInput | ScheduleRuleUpdateManyWithWhereWithoutRootRuleInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput = {
    create?: XOR<ScheduleRuleCreateWithoutDependsOnInput, ScheduleRuleUncheckedCreateWithoutDependsOnInput> | ScheduleRuleCreateWithoutDependsOnInput[] | ScheduleRuleUncheckedCreateWithoutDependsOnInput[]
    connectOrCreate?: ScheduleRuleCreateOrConnectWithoutDependsOnInput | ScheduleRuleCreateOrConnectWithoutDependsOnInput[]
    upsert?: ScheduleRuleUpsertWithWhereUniqueWithoutDependsOnInput | ScheduleRuleUpsertWithWhereUniqueWithoutDependsOnInput[]
    createMany?: ScheduleRuleCreateManyDependsOnInputEnvelope
    set?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    disconnect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    delete?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    connect?: ScheduleRuleWhereUniqueInput | ScheduleRuleWhereUniqueInput[]
    update?: ScheduleRuleUpdateWithWhereUniqueWithoutDependsOnInput | ScheduleRuleUpdateWithWhereUniqueWithoutDependsOnInput[]
    updateMany?: ScheduleRuleUpdateManyWithWhereWithoutDependsOnInput | ScheduleRuleUpdateManyWithWhereWithoutDependsOnInput[]
    deleteMany?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumClassStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassStatus | EnumClassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClassStatusFilter<$PrismaModel> | $Enums.ClassStatus
  }

  export type NestedEnumClassStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClassStatus | EnumClassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClassStatus[] | ListEnumClassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClassStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClassStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClassStatusFilter<$PrismaModel>
    _max?: NestedEnumClassStatusFilter<$PrismaModel>
  }

  export type NestedEnumOverrideTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OverrideType | EnumOverrideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOverrideTypeFilter<$PrismaModel> | $Enums.OverrideType
  }

  export type NestedEnumOverrideTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OverrideType | EnumOverrideTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OverrideType[] | ListEnumOverrideTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOverrideTypeWithAggregatesFilter<$PrismaModel> | $Enums.OverrideType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOverrideTypeFilter<$PrismaModel>
    _max?: NestedEnumOverrideTypeFilter<$PrismaModel>
  }

  export type ScheduleCreateWithoutProfessorInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutSchedulesInput
    subject: SubjectCreateNestedOneWithoutSchedulesInput
    room: RoomCreateNestedOneWithoutSchedulesInput
    rule?: ScheduleRuleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutProfessorInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutProfessorInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutProfessorInput, ScheduleUncheckedCreateWithoutProfessorInput>
  }

  export type ScheduleCreateManyProfessorInputEnvelope = {
    data: ScheduleCreateManyProfessorInput | ScheduleCreateManyProfessorInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleRuleCreateWithoutProfessorInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutProfessorInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutProfessorInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutProfessorInput, ScheduleRuleUncheckedCreateWithoutProfessorInput>
  }

  export type ScheduleRuleCreateManyProfessorInputEnvelope = {
    data: ScheduleRuleCreateManyProfessorInput | ScheduleRuleCreateManyProfessorInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleUpsertWithWhereUniqueWithoutProfessorInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutProfessorInput, ScheduleUncheckedUpdateWithoutProfessorInput>
    create: XOR<ScheduleCreateWithoutProfessorInput, ScheduleUncheckedCreateWithoutProfessorInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutProfessorInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutProfessorInput, ScheduleUncheckedUpdateWithoutProfessorInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutProfessorInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutProfessorInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: StringFilter<"Schedule"> | string
    startTime?: DateTimeFilter<"Schedule"> | Date | string
    endTime?: DateTimeFilter<"Schedule"> | Date | string
    status?: EnumClassStatusFilter<"Schedule"> | $Enums.ClassStatus
    cancelReason?: StringNullableFilter<"Schedule"> | string | null
    classGroupId?: StringFilter<"Schedule"> | string
    subjectId?: StringFilter<"Schedule"> | string
    professorId?: StringFilter<"Schedule"> | string
    roomId?: StringFilter<"Schedule"> | string
    ruleId?: StringNullableFilter<"Schedule"> | string | null
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type ScheduleRuleUpsertWithWhereUniqueWithoutProfessorInput = {
    where: ScheduleRuleWhereUniqueInput
    update: XOR<ScheduleRuleUpdateWithoutProfessorInput, ScheduleRuleUncheckedUpdateWithoutProfessorInput>
    create: XOR<ScheduleRuleCreateWithoutProfessorInput, ScheduleRuleUncheckedCreateWithoutProfessorInput>
  }

  export type ScheduleRuleUpdateWithWhereUniqueWithoutProfessorInput = {
    where: ScheduleRuleWhereUniqueInput
    data: XOR<ScheduleRuleUpdateWithoutProfessorInput, ScheduleRuleUncheckedUpdateWithoutProfessorInput>
  }

  export type ScheduleRuleUpdateManyWithWhereWithoutProfessorInput = {
    where: ScheduleRuleScalarWhereInput
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyWithoutProfessorInput>
  }

  export type ScheduleRuleScalarWhereInput = {
    AND?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
    OR?: ScheduleRuleScalarWhereInput[]
    NOT?: ScheduleRuleScalarWhereInput | ScheduleRuleScalarWhereInput[]
    id?: StringFilter<"ScheduleRule"> | string
    daysOfWeek?: IntNullableListFilter<"ScheduleRule">
    startTimeStr?: StringFilter<"ScheduleRule"> | string
    endTimeStr?: StringFilter<"ScheduleRule"> | string
    totalHours?: IntFilter<"ScheduleRule"> | number
    classGroupId?: StringFilter<"ScheduleRule"> | string
    subjectId?: StringFilter<"ScheduleRule"> | string
    professorId?: StringFilter<"ScheduleRule"> | string
    roomId?: StringFilter<"ScheduleRule"> | string
    rootRuleId?: StringNullableFilter<"ScheduleRule"> | string | null
    dependsOnRuleId?: StringNullableFilter<"ScheduleRule"> | string | null
    createdAt?: DateTimeFilter<"ScheduleRule"> | Date | string
    updatedAt?: DateTimeFilter<"ScheduleRule"> | Date | string
  }

  export type ScheduleCreateWithoutRoomInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutSchedulesInput
    subject: SubjectCreateNestedOneWithoutSchedulesInput
    professor: ProfessorCreateNestedOneWithoutSchedulesInput
    rule?: ScheduleRuleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutRoomInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutRoomInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutRoomInput, ScheduleUncheckedCreateWithoutRoomInput>
  }

  export type ScheduleCreateManyRoomInputEnvelope = {
    data: ScheduleCreateManyRoomInput | ScheduleCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleRuleCreateWithoutRoomInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutRoomInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutRoomInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutRoomInput, ScheduleRuleUncheckedCreateWithoutRoomInput>
  }

  export type ScheduleRuleCreateManyRoomInputEnvelope = {
    data: ScheduleRuleCreateManyRoomInput | ScheduleRuleCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleUpsertWithWhereUniqueWithoutRoomInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutRoomInput, ScheduleUncheckedUpdateWithoutRoomInput>
    create: XOR<ScheduleCreateWithoutRoomInput, ScheduleUncheckedCreateWithoutRoomInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutRoomInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutRoomInput, ScheduleUncheckedUpdateWithoutRoomInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutRoomInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutRoomInput>
  }

  export type ScheduleRuleUpsertWithWhereUniqueWithoutRoomInput = {
    where: ScheduleRuleWhereUniqueInput
    update: XOR<ScheduleRuleUpdateWithoutRoomInput, ScheduleRuleUncheckedUpdateWithoutRoomInput>
    create: XOR<ScheduleRuleCreateWithoutRoomInput, ScheduleRuleUncheckedCreateWithoutRoomInput>
  }

  export type ScheduleRuleUpdateWithWhereUniqueWithoutRoomInput = {
    where: ScheduleRuleWhereUniqueInput
    data: XOR<ScheduleRuleUpdateWithoutRoomInput, ScheduleRuleUncheckedUpdateWithoutRoomInput>
  }

  export type ScheduleRuleUpdateManyWithWhereWithoutRoomInput = {
    where: ScheduleRuleScalarWhereInput
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyWithoutRoomInput>
  }

  export type CurriculumCreateWithoutCourseInput = {
    id?: string
    name: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: CurriculumSubjectCreateNestedManyWithoutCurriculumInput
    classGroups?: ClassGroupCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumUncheckedCreateWithoutCourseInput = {
    id?: string
    name: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: CurriculumSubjectUncheckedCreateNestedManyWithoutCurriculumInput
    classGroups?: ClassGroupUncheckedCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumCreateOrConnectWithoutCourseInput = {
    where: CurriculumWhereUniqueInput
    create: XOR<CurriculumCreateWithoutCourseInput, CurriculumUncheckedCreateWithoutCourseInput>
  }

  export type CurriculumCreateManyCourseInputEnvelope = {
    data: CurriculumCreateManyCourseInput | CurriculumCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type CurriculumUpsertWithWhereUniqueWithoutCourseInput = {
    where: CurriculumWhereUniqueInput
    update: XOR<CurriculumUpdateWithoutCourseInput, CurriculumUncheckedUpdateWithoutCourseInput>
    create: XOR<CurriculumCreateWithoutCourseInput, CurriculumUncheckedCreateWithoutCourseInput>
  }

  export type CurriculumUpdateWithWhereUniqueWithoutCourseInput = {
    where: CurriculumWhereUniqueInput
    data: XOR<CurriculumUpdateWithoutCourseInput, CurriculumUncheckedUpdateWithoutCourseInput>
  }

  export type CurriculumUpdateManyWithWhereWithoutCourseInput = {
    where: CurriculumScalarWhereInput
    data: XOR<CurriculumUpdateManyMutationInput, CurriculumUncheckedUpdateManyWithoutCourseInput>
  }

  export type CurriculumScalarWhereInput = {
    AND?: CurriculumScalarWhereInput | CurriculumScalarWhereInput[]
    OR?: CurriculumScalarWhereInput[]
    NOT?: CurriculumScalarWhereInput | CurriculumScalarWhereInput[]
    id?: StringFilter<"Curriculum"> | string
    name?: StringFilter<"Curriculum"> | string
    active?: BoolFilter<"Curriculum"> | boolean
    courseId?: StringFilter<"Curriculum"> | string
    createdAt?: DateTimeFilter<"Curriculum"> | Date | string
    updatedAt?: DateTimeFilter<"Curriculum"> | Date | string
  }

  export type CourseCreateWithoutCurriculumsInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUncheckedCreateWithoutCurriculumsInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseCreateOrConnectWithoutCurriculumsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCurriculumsInput, CourseUncheckedCreateWithoutCurriculumsInput>
  }

  export type CurriculumSubjectCreateWithoutCurriculumInput = {
    module: number
    subject: SubjectCreateNestedOneWithoutCurriculumsInput
  }

  export type CurriculumSubjectUncheckedCreateWithoutCurriculumInput = {
    subjectId: string
    module: number
  }

  export type CurriculumSubjectCreateOrConnectWithoutCurriculumInput = {
    where: CurriculumSubjectWhereUniqueInput
    create: XOR<CurriculumSubjectCreateWithoutCurriculumInput, CurriculumSubjectUncheckedCreateWithoutCurriculumInput>
  }

  export type CurriculumSubjectCreateManyCurriculumInputEnvelope = {
    data: CurriculumSubjectCreateManyCurriculumInput | CurriculumSubjectCreateManyCurriculumInput[]
    skipDuplicates?: boolean
  }

  export type ClassGroupCreateWithoutCurriculumInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutClassGroupInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupUncheckedCreateWithoutCurriculumInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutClassGroupInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupCreateOrConnectWithoutCurriculumInput = {
    where: ClassGroupWhereUniqueInput
    create: XOR<ClassGroupCreateWithoutCurriculumInput, ClassGroupUncheckedCreateWithoutCurriculumInput>
  }

  export type ClassGroupCreateManyCurriculumInputEnvelope = {
    data: ClassGroupCreateManyCurriculumInput | ClassGroupCreateManyCurriculumInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithoutCurriculumsInput = {
    update: XOR<CourseUpdateWithoutCurriculumsInput, CourseUncheckedUpdateWithoutCurriculumsInput>
    create: XOR<CourseCreateWithoutCurriculumsInput, CourseUncheckedCreateWithoutCurriculumsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutCurriculumsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutCurriculumsInput, CourseUncheckedUpdateWithoutCurriculumsInput>
  }

  export type CourseUpdateWithoutCurriculumsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateWithoutCurriculumsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumSubjectUpsertWithWhereUniqueWithoutCurriculumInput = {
    where: CurriculumSubjectWhereUniqueInput
    update: XOR<CurriculumSubjectUpdateWithoutCurriculumInput, CurriculumSubjectUncheckedUpdateWithoutCurriculumInput>
    create: XOR<CurriculumSubjectCreateWithoutCurriculumInput, CurriculumSubjectUncheckedCreateWithoutCurriculumInput>
  }

  export type CurriculumSubjectUpdateWithWhereUniqueWithoutCurriculumInput = {
    where: CurriculumSubjectWhereUniqueInput
    data: XOR<CurriculumSubjectUpdateWithoutCurriculumInput, CurriculumSubjectUncheckedUpdateWithoutCurriculumInput>
  }

  export type CurriculumSubjectUpdateManyWithWhereWithoutCurriculumInput = {
    where: CurriculumSubjectScalarWhereInput
    data: XOR<CurriculumSubjectUpdateManyMutationInput, CurriculumSubjectUncheckedUpdateManyWithoutCurriculumInput>
  }

  export type CurriculumSubjectScalarWhereInput = {
    AND?: CurriculumSubjectScalarWhereInput | CurriculumSubjectScalarWhereInput[]
    OR?: CurriculumSubjectScalarWhereInput[]
    NOT?: CurriculumSubjectScalarWhereInput | CurriculumSubjectScalarWhereInput[]
    curriculumId?: StringFilter<"CurriculumSubject"> | string
    subjectId?: StringFilter<"CurriculumSubject"> | string
    module?: IntFilter<"CurriculumSubject"> | number
  }

  export type ClassGroupUpsertWithWhereUniqueWithoutCurriculumInput = {
    where: ClassGroupWhereUniqueInput
    update: XOR<ClassGroupUpdateWithoutCurriculumInput, ClassGroupUncheckedUpdateWithoutCurriculumInput>
    create: XOR<ClassGroupCreateWithoutCurriculumInput, ClassGroupUncheckedCreateWithoutCurriculumInput>
  }

  export type ClassGroupUpdateWithWhereUniqueWithoutCurriculumInput = {
    where: ClassGroupWhereUniqueInput
    data: XOR<ClassGroupUpdateWithoutCurriculumInput, ClassGroupUncheckedUpdateWithoutCurriculumInput>
  }

  export type ClassGroupUpdateManyWithWhereWithoutCurriculumInput = {
    where: ClassGroupScalarWhereInput
    data: XOR<ClassGroupUpdateManyMutationInput, ClassGroupUncheckedUpdateManyWithoutCurriculumInput>
  }

  export type ClassGroupScalarWhereInput = {
    AND?: ClassGroupScalarWhereInput | ClassGroupScalarWhereInput[]
    OR?: ClassGroupScalarWhereInput[]
    NOT?: ClassGroupScalarWhereInput | ClassGroupScalarWhereInput[]
    id?: StringFilter<"ClassGroup"> | string
    code?: StringFilter<"ClassGroup"> | string
    shift?: StringFilter<"ClassGroup"> | string
    startDate?: DateTimeFilter<"ClassGroup"> | Date | string
    endDate?: DateTimeNullableFilter<"ClassGroup"> | Date | string | null
    curriculumId?: StringFilter<"ClassGroup"> | string
    createdAt?: DateTimeFilter<"ClassGroup"> | Date | string
    updatedAt?: DateTimeFilter<"ClassGroup"> | Date | string
  }

  export type CurriculumSubjectCreateWithoutSubjectInput = {
    module: number
    curriculum: CurriculumCreateNestedOneWithoutSubjectsInput
  }

  export type CurriculumSubjectUncheckedCreateWithoutSubjectInput = {
    curriculumId: string
    module: number
  }

  export type CurriculumSubjectCreateOrConnectWithoutSubjectInput = {
    where: CurriculumSubjectWhereUniqueInput
    create: XOR<CurriculumSubjectCreateWithoutSubjectInput, CurriculumSubjectUncheckedCreateWithoutSubjectInput>
  }

  export type CurriculumSubjectCreateManySubjectInputEnvelope = {
    data: CurriculumSubjectCreateManySubjectInput | CurriculumSubjectCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleCreateWithoutSubjectInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutSchedulesInput
    professor: ProfessorCreateNestedOneWithoutSchedulesInput
    room: RoomCreateNestedOneWithoutSchedulesInput
    rule?: ScheduleRuleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutSubjectInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    professorId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutSubjectInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutSubjectInput, ScheduleUncheckedCreateWithoutSubjectInput>
  }

  export type ScheduleCreateManySubjectInputEnvelope = {
    data: ScheduleCreateManySubjectInput | ScheduleCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleRuleCreateWithoutSubjectInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutSubjectInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutSubjectInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutSubjectInput, ScheduleRuleUncheckedCreateWithoutSubjectInput>
  }

  export type ScheduleRuleCreateManySubjectInputEnvelope = {
    data: ScheduleRuleCreateManySubjectInput | ScheduleRuleCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type CurriculumSubjectUpsertWithWhereUniqueWithoutSubjectInput = {
    where: CurriculumSubjectWhereUniqueInput
    update: XOR<CurriculumSubjectUpdateWithoutSubjectInput, CurriculumSubjectUncheckedUpdateWithoutSubjectInput>
    create: XOR<CurriculumSubjectCreateWithoutSubjectInput, CurriculumSubjectUncheckedCreateWithoutSubjectInput>
  }

  export type CurriculumSubjectUpdateWithWhereUniqueWithoutSubjectInput = {
    where: CurriculumSubjectWhereUniqueInput
    data: XOR<CurriculumSubjectUpdateWithoutSubjectInput, CurriculumSubjectUncheckedUpdateWithoutSubjectInput>
  }

  export type CurriculumSubjectUpdateManyWithWhereWithoutSubjectInput = {
    where: CurriculumSubjectScalarWhereInput
    data: XOR<CurriculumSubjectUpdateManyMutationInput, CurriculumSubjectUncheckedUpdateManyWithoutSubjectInput>
  }

  export type ScheduleUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutSubjectInput, ScheduleUncheckedUpdateWithoutSubjectInput>
    create: XOR<ScheduleCreateWithoutSubjectInput, ScheduleUncheckedCreateWithoutSubjectInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutSubjectInput, ScheduleUncheckedUpdateWithoutSubjectInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutSubjectInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutSubjectInput>
  }

  export type ScheduleRuleUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ScheduleRuleWhereUniqueInput
    update: XOR<ScheduleRuleUpdateWithoutSubjectInput, ScheduleRuleUncheckedUpdateWithoutSubjectInput>
    create: XOR<ScheduleRuleCreateWithoutSubjectInput, ScheduleRuleUncheckedCreateWithoutSubjectInput>
  }

  export type ScheduleRuleUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ScheduleRuleWhereUniqueInput
    data: XOR<ScheduleRuleUpdateWithoutSubjectInput, ScheduleRuleUncheckedUpdateWithoutSubjectInput>
  }

  export type ScheduleRuleUpdateManyWithWhereWithoutSubjectInput = {
    where: ScheduleRuleScalarWhereInput
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyWithoutSubjectInput>
  }

  export type CurriculumCreateWithoutSubjectsInput = {
    id?: string
    name: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutCurriculumsInput
    classGroups?: ClassGroupCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumUncheckedCreateWithoutSubjectsInput = {
    id?: string
    name: string
    active?: boolean
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroups?: ClassGroupUncheckedCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumCreateOrConnectWithoutSubjectsInput = {
    where: CurriculumWhereUniqueInput
    create: XOR<CurriculumCreateWithoutSubjectsInput, CurriculumUncheckedCreateWithoutSubjectsInput>
  }

  export type SubjectCreateWithoutCurriculumsInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutSubjectInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutCurriculumsInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutSubjectInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutCurriculumsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutCurriculumsInput, SubjectUncheckedCreateWithoutCurriculumsInput>
  }

  export type CurriculumUpsertWithoutSubjectsInput = {
    update: XOR<CurriculumUpdateWithoutSubjectsInput, CurriculumUncheckedUpdateWithoutSubjectsInput>
    create: XOR<CurriculumCreateWithoutSubjectsInput, CurriculumUncheckedCreateWithoutSubjectsInput>
    where?: CurriculumWhereInput
  }

  export type CurriculumUpdateToOneWithWhereWithoutSubjectsInput = {
    where?: CurriculumWhereInput
    data: XOR<CurriculumUpdateWithoutSubjectsInput, CurriculumUncheckedUpdateWithoutSubjectsInput>
  }

  export type CurriculumUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutCurriculumsNestedInput
    classGroups?: ClassGroupUpdateManyWithoutCurriculumNestedInput
  }

  export type CurriculumUncheckedUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroups?: ClassGroupUncheckedUpdateManyWithoutCurriculumNestedInput
  }

  export type SubjectUpsertWithoutCurriculumsInput = {
    update: XOR<SubjectUpdateWithoutCurriculumsInput, SubjectUncheckedUpdateWithoutCurriculumsInput>
    create: XOR<SubjectCreateWithoutCurriculumsInput, SubjectUncheckedCreateWithoutCurriculumsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutCurriculumsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutCurriculumsInput, SubjectUncheckedUpdateWithoutCurriculumsInput>
  }

  export type SubjectUpdateWithoutCurriculumsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutSubjectNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutCurriculumsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutSubjectNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type CurriculumCreateWithoutClassGroupsInput = {
    id?: string
    name: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutCurriculumsInput
    subjects?: CurriculumSubjectCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumUncheckedCreateWithoutClassGroupsInput = {
    id?: string
    name: string
    active?: boolean
    courseId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: CurriculumSubjectUncheckedCreateNestedManyWithoutCurriculumInput
  }

  export type CurriculumCreateOrConnectWithoutClassGroupsInput = {
    where: CurriculumWhereUniqueInput
    create: XOR<CurriculumCreateWithoutClassGroupsInput, CurriculumUncheckedCreateWithoutClassGroupsInput>
  }

  export type ScheduleCreateWithoutClassGroupInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutSchedulesInput
    professor: ProfessorCreateNestedOneWithoutSchedulesInput
    room: RoomCreateNestedOneWithoutSchedulesInput
    rule?: ScheduleRuleCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutClassGroupInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    subjectId: string
    professorId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutClassGroupInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutClassGroupInput, ScheduleUncheckedCreateWithoutClassGroupInput>
  }

  export type ScheduleCreateManyClassGroupInputEnvelope = {
    data: ScheduleCreateManyClassGroupInput | ScheduleCreateManyClassGroupInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleRuleCreateWithoutClassGroupInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutClassGroupInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutClassGroupInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutClassGroupInput, ScheduleRuleUncheckedCreateWithoutClassGroupInput>
  }

  export type ScheduleRuleCreateManyClassGroupInputEnvelope = {
    data: ScheduleRuleCreateManyClassGroupInput | ScheduleRuleCreateManyClassGroupInput[]
    skipDuplicates?: boolean
  }

  export type CurriculumUpsertWithoutClassGroupsInput = {
    update: XOR<CurriculumUpdateWithoutClassGroupsInput, CurriculumUncheckedUpdateWithoutClassGroupsInput>
    create: XOR<CurriculumCreateWithoutClassGroupsInput, CurriculumUncheckedCreateWithoutClassGroupsInput>
    where?: CurriculumWhereInput
  }

  export type CurriculumUpdateToOneWithWhereWithoutClassGroupsInput = {
    where?: CurriculumWhereInput
    data: XOR<CurriculumUpdateWithoutClassGroupsInput, CurriculumUncheckedUpdateWithoutClassGroupsInput>
  }

  export type CurriculumUpdateWithoutClassGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutCurriculumsNestedInput
    subjects?: CurriculumSubjectUpdateManyWithoutCurriculumNestedInput
  }

  export type CurriculumUncheckedUpdateWithoutClassGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    courseId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: CurriculumSubjectUncheckedUpdateManyWithoutCurriculumNestedInput
  }

  export type ScheduleUpsertWithWhereUniqueWithoutClassGroupInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutClassGroupInput, ScheduleUncheckedUpdateWithoutClassGroupInput>
    create: XOR<ScheduleCreateWithoutClassGroupInput, ScheduleUncheckedCreateWithoutClassGroupInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutClassGroupInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutClassGroupInput, ScheduleUncheckedUpdateWithoutClassGroupInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutClassGroupInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutClassGroupInput>
  }

  export type ScheduleRuleUpsertWithWhereUniqueWithoutClassGroupInput = {
    where: ScheduleRuleWhereUniqueInput
    update: XOR<ScheduleRuleUpdateWithoutClassGroupInput, ScheduleRuleUncheckedUpdateWithoutClassGroupInput>
    create: XOR<ScheduleRuleCreateWithoutClassGroupInput, ScheduleRuleUncheckedCreateWithoutClassGroupInput>
  }

  export type ScheduleRuleUpdateWithWhereUniqueWithoutClassGroupInput = {
    where: ScheduleRuleWhereUniqueInput
    data: XOR<ScheduleRuleUpdateWithoutClassGroupInput, ScheduleRuleUncheckedUpdateWithoutClassGroupInput>
  }

  export type ScheduleRuleUpdateManyWithWhereWithoutClassGroupInput = {
    where: ScheduleRuleScalarWhereInput
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyWithoutClassGroupInput>
  }

  export type ClassGroupCreateWithoutSchedulesInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculum: CurriculumCreateNestedOneWithoutClassGroupsInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupUncheckedCreateWithoutSchedulesInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    curriculumId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupCreateOrConnectWithoutSchedulesInput = {
    where: ClassGroupWhereUniqueInput
    create: XOR<ClassGroupCreateWithoutSchedulesInput, ClassGroupUncheckedCreateWithoutSchedulesInput>
  }

  export type SubjectCreateWithoutSchedulesInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumSubjectCreateNestedManyWithoutSubjectInput
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutSchedulesInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumSubjectUncheckedCreateNestedManyWithoutSubjectInput
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutSchedulesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutSchedulesInput, SubjectUncheckedCreateWithoutSchedulesInput>
  }

  export type ProfessorCreateWithoutSchedulesInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateWithoutSchedulesInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorCreateOrConnectWithoutSchedulesInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutSchedulesInput, ProfessorUncheckedCreateWithoutSchedulesInput>
  }

  export type RoomCreateWithoutSchedulesInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleRules?: ScheduleRuleCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutSchedulesInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    scheduleRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutSchedulesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutSchedulesInput, RoomUncheckedCreateWithoutSchedulesInput>
  }

  export type ScheduleRuleCreateWithoutSchedulesInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutSchedulesInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutSchedulesInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutSchedulesInput, ScheduleRuleUncheckedCreateWithoutSchedulesInput>
  }

  export type ClassGroupUpsertWithoutSchedulesInput = {
    update: XOR<ClassGroupUpdateWithoutSchedulesInput, ClassGroupUncheckedUpdateWithoutSchedulesInput>
    create: XOR<ClassGroupCreateWithoutSchedulesInput, ClassGroupUncheckedCreateWithoutSchedulesInput>
    where?: ClassGroupWhereInput
  }

  export type ClassGroupUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: ClassGroupWhereInput
    data: XOR<ClassGroupUpdateWithoutSchedulesInput, ClassGroupUncheckedUpdateWithoutSchedulesInput>
  }

  export type ClassGroupUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculum?: CurriculumUpdateOneRequiredWithoutClassGroupsNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutClassGroupNestedInput
  }

  export type ClassGroupUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curriculumId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutClassGroupNestedInput
  }

  export type SubjectUpsertWithoutSchedulesInput = {
    update: XOR<SubjectUpdateWithoutSchedulesInput, SubjectUncheckedUpdateWithoutSchedulesInput>
    create: XOR<SubjectCreateWithoutSchedulesInput, SubjectUncheckedCreateWithoutSchedulesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutSchedulesInput, SubjectUncheckedUpdateWithoutSchedulesInput>
  }

  export type SubjectUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumSubjectUpdateManyWithoutSubjectNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumSubjectUncheckedUpdateManyWithoutSubjectNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ProfessorUpsertWithoutSchedulesInput = {
    update: XOR<ProfessorUpdateWithoutSchedulesInput, ProfessorUncheckedUpdateWithoutSchedulesInput>
    create: XOR<ProfessorCreateWithoutSchedulesInput, ProfessorUncheckedCreateWithoutSchedulesInput>
    where?: ProfessorWhereInput
  }

  export type ProfessorUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: ProfessorWhereInput
    data: XOR<ProfessorUpdateWithoutSchedulesInput, ProfessorUncheckedUpdateWithoutSchedulesInput>
  }

  export type ProfessorUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleRules?: ScheduleRuleUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type RoomUpsertWithoutSchedulesInput = {
    update: XOR<RoomUpdateWithoutSchedulesInput, RoomUncheckedUpdateWithoutSchedulesInput>
    create: XOR<RoomCreateWithoutSchedulesInput, RoomUncheckedCreateWithoutSchedulesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutSchedulesInput, RoomUncheckedUpdateWithoutSchedulesInput>
  }

  export type RoomUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleRules?: ScheduleRuleUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type ScheduleRuleUpsertWithoutSchedulesInput = {
    update: XOR<ScheduleRuleUpdateWithoutSchedulesInput, ScheduleRuleUncheckedUpdateWithoutSchedulesInput>
    create: XOR<ScheduleRuleCreateWithoutSchedulesInput, ScheduleRuleUncheckedCreateWithoutSchedulesInput>
    where?: ScheduleRuleWhereInput
  }

  export type ScheduleRuleUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: ScheduleRuleWhereInput
    data: XOR<ScheduleRuleUpdateWithoutSchedulesInput, ScheduleRuleUncheckedUpdateWithoutSchedulesInput>
  }

  export type ScheduleRuleUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ClassGroupCreateWithoutScheduleRulesInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculum: CurriculumCreateNestedOneWithoutClassGroupsInput
    schedules?: ScheduleCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupUncheckedCreateWithoutScheduleRulesInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    curriculumId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutClassGroupInput
  }

  export type ClassGroupCreateOrConnectWithoutScheduleRulesInput = {
    where: ClassGroupWhereUniqueInput
    create: XOR<ClassGroupCreateWithoutScheduleRulesInput, ClassGroupUncheckedCreateWithoutScheduleRulesInput>
  }

  export type SubjectCreateWithoutScheduleRulesInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumSubjectCreateNestedManyWithoutSubjectInput
    schedules?: ScheduleCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutScheduleRulesInput = {
    id?: string
    name: string
    code: string
    hours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    curriculums?: CurriculumSubjectUncheckedCreateNestedManyWithoutSubjectInput
    schedules?: ScheduleUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutScheduleRulesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutScheduleRulesInput, SubjectUncheckedCreateWithoutScheduleRulesInput>
  }

  export type ProfessorCreateWithoutScheduleRulesInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorUncheckedCreateWithoutScheduleRulesInput = {
    id?: string
    name: string
    email: string
    degree?: string | null
    department?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutProfessorInput
  }

  export type ProfessorCreateOrConnectWithoutScheduleRulesInput = {
    where: ProfessorWhereUniqueInput
    create: XOR<ProfessorCreateWithoutScheduleRulesInput, ProfessorUncheckedCreateWithoutScheduleRulesInput>
  }

  export type RoomCreateWithoutScheduleRulesInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutScheduleRulesInput = {
    id?: string
    name: string
    capacity: number
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutScheduleRulesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutScheduleRulesInput, RoomUncheckedCreateWithoutScheduleRulesInput>
  }

  export type ScheduleCreateWithoutRuleInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutSchedulesInput
    subject: SubjectCreateNestedOneWithoutSchedulesInput
    professor: ProfessorCreateNestedOneWithoutSchedulesInput
    room: RoomCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateWithoutRuleInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutRuleInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutRuleInput, ScheduleUncheckedCreateWithoutRuleInput>
  }

  export type ScheduleCreateManyRuleInputEnvelope = {
    data: ScheduleCreateManyRuleInput | ScheduleCreateManyRuleInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleRuleCreateWithoutChildRulesInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutChildRulesInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutChildRulesInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutChildRulesInput, ScheduleRuleUncheckedCreateWithoutChildRulesInput>
  }

  export type ScheduleRuleCreateWithoutRootRuleInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutRootRuleInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutRootRuleInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutRootRuleInput, ScheduleRuleUncheckedCreateWithoutRootRuleInput>
  }

  export type ScheduleRuleCreateManyRootRuleInputEnvelope = {
    data: ScheduleRuleCreateManyRootRuleInput | ScheduleRuleCreateManyRootRuleInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleRuleCreateWithoutDependentRulesInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependsOn?: ScheduleRuleCreateNestedOneWithoutDependentRulesInput
  }

  export type ScheduleRuleUncheckedCreateWithoutDependentRulesInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
  }

  export type ScheduleRuleCreateOrConnectWithoutDependentRulesInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutDependentRulesInput, ScheduleRuleUncheckedCreateWithoutDependentRulesInput>
  }

  export type ScheduleRuleCreateWithoutDependsOnInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    createdAt?: Date | string
    updatedAt?: Date | string
    classGroup: ClassGroupCreateNestedOneWithoutScheduleRulesInput
    subject: SubjectCreateNestedOneWithoutScheduleRulesInput
    professor: ProfessorCreateNestedOneWithoutScheduleRulesInput
    room: RoomCreateNestedOneWithoutScheduleRulesInput
    schedules?: ScheduleCreateNestedManyWithoutRuleInput
    rootRule?: ScheduleRuleCreateNestedOneWithoutChildRulesInput
    childRules?: ScheduleRuleCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleUncheckedCreateWithoutDependsOnInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRuleInput
    childRules?: ScheduleRuleUncheckedCreateNestedManyWithoutRootRuleInput
    dependentRules?: ScheduleRuleUncheckedCreateNestedManyWithoutDependsOnInput
  }

  export type ScheduleRuleCreateOrConnectWithoutDependsOnInput = {
    where: ScheduleRuleWhereUniqueInput
    create: XOR<ScheduleRuleCreateWithoutDependsOnInput, ScheduleRuleUncheckedCreateWithoutDependsOnInput>
  }

  export type ScheduleRuleCreateManyDependsOnInputEnvelope = {
    data: ScheduleRuleCreateManyDependsOnInput | ScheduleRuleCreateManyDependsOnInput[]
    skipDuplicates?: boolean
  }

  export type ClassGroupUpsertWithoutScheduleRulesInput = {
    update: XOR<ClassGroupUpdateWithoutScheduleRulesInput, ClassGroupUncheckedUpdateWithoutScheduleRulesInput>
    create: XOR<ClassGroupCreateWithoutScheduleRulesInput, ClassGroupUncheckedCreateWithoutScheduleRulesInput>
    where?: ClassGroupWhereInput
  }

  export type ClassGroupUpdateToOneWithWhereWithoutScheduleRulesInput = {
    where?: ClassGroupWhereInput
    data: XOR<ClassGroupUpdateWithoutScheduleRulesInput, ClassGroupUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type ClassGroupUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculum?: CurriculumUpdateOneRequiredWithoutClassGroupsNestedInput
    schedules?: ScheduleUpdateManyWithoutClassGroupNestedInput
  }

  export type ClassGroupUncheckedUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curriculumId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutClassGroupNestedInput
  }

  export type SubjectUpsertWithoutScheduleRulesInput = {
    update: XOR<SubjectUpdateWithoutScheduleRulesInput, SubjectUncheckedUpdateWithoutScheduleRulesInput>
    create: XOR<SubjectCreateWithoutScheduleRulesInput, SubjectUncheckedCreateWithoutScheduleRulesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutScheduleRulesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutScheduleRulesInput, SubjectUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type SubjectUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumSubjectUpdateManyWithoutSubjectNestedInput
    schedules?: ScheduleUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    hours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    curriculums?: CurriculumSubjectUncheckedUpdateManyWithoutSubjectNestedInput
    schedules?: ScheduleUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ProfessorUpsertWithoutScheduleRulesInput = {
    update: XOR<ProfessorUpdateWithoutScheduleRulesInput, ProfessorUncheckedUpdateWithoutScheduleRulesInput>
    create: XOR<ProfessorCreateWithoutScheduleRulesInput, ProfessorUncheckedCreateWithoutScheduleRulesInput>
    where?: ProfessorWhereInput
  }

  export type ProfessorUpdateToOneWithWhereWithoutScheduleRulesInput = {
    where?: ProfessorWhereInput
    data: XOR<ProfessorUpdateWithoutScheduleRulesInput, ProfessorUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type ProfessorUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutProfessorNestedInput
  }

  export type ProfessorUncheckedUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    degree?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutProfessorNestedInput
  }

  export type RoomUpsertWithoutScheduleRulesInput = {
    update: XOR<RoomUpdateWithoutScheduleRulesInput, RoomUncheckedUpdateWithoutScheduleRulesInput>
    create: XOR<RoomCreateWithoutScheduleRulesInput, RoomUncheckedCreateWithoutScheduleRulesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutScheduleRulesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutScheduleRulesInput, RoomUncheckedUpdateWithoutScheduleRulesInput>
  }

  export type RoomUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutScheduleRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type ScheduleUpsertWithWhereUniqueWithoutRuleInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutRuleInput, ScheduleUncheckedUpdateWithoutRuleInput>
    create: XOR<ScheduleCreateWithoutRuleInput, ScheduleUncheckedCreateWithoutRuleInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutRuleInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutRuleInput, ScheduleUncheckedUpdateWithoutRuleInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutRuleInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutRuleInput>
  }

  export type ScheduleRuleUpsertWithoutChildRulesInput = {
    update: XOR<ScheduleRuleUpdateWithoutChildRulesInput, ScheduleRuleUncheckedUpdateWithoutChildRulesInput>
    create: XOR<ScheduleRuleCreateWithoutChildRulesInput, ScheduleRuleUncheckedCreateWithoutChildRulesInput>
    where?: ScheduleRuleWhereInput
  }

  export type ScheduleRuleUpdateToOneWithWhereWithoutChildRulesInput = {
    where?: ScheduleRuleWhereInput
    data: XOR<ScheduleRuleUpdateWithoutChildRulesInput, ScheduleRuleUncheckedUpdateWithoutChildRulesInput>
  }

  export type ScheduleRuleUpdateWithoutChildRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutChildRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUpsertWithWhereUniqueWithoutRootRuleInput = {
    where: ScheduleRuleWhereUniqueInput
    update: XOR<ScheduleRuleUpdateWithoutRootRuleInput, ScheduleRuleUncheckedUpdateWithoutRootRuleInput>
    create: XOR<ScheduleRuleCreateWithoutRootRuleInput, ScheduleRuleUncheckedCreateWithoutRootRuleInput>
  }

  export type ScheduleRuleUpdateWithWhereUniqueWithoutRootRuleInput = {
    where: ScheduleRuleWhereUniqueInput
    data: XOR<ScheduleRuleUpdateWithoutRootRuleInput, ScheduleRuleUncheckedUpdateWithoutRootRuleInput>
  }

  export type ScheduleRuleUpdateManyWithWhereWithoutRootRuleInput = {
    where: ScheduleRuleScalarWhereInput
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyWithoutRootRuleInput>
  }

  export type ScheduleRuleUpsertWithoutDependentRulesInput = {
    update: XOR<ScheduleRuleUpdateWithoutDependentRulesInput, ScheduleRuleUncheckedUpdateWithoutDependentRulesInput>
    create: XOR<ScheduleRuleCreateWithoutDependentRulesInput, ScheduleRuleUncheckedCreateWithoutDependentRulesInput>
    where?: ScheduleRuleWhereInput
  }

  export type ScheduleRuleUpdateToOneWithWhereWithoutDependentRulesInput = {
    where?: ScheduleRuleWhereInput
    data: XOR<ScheduleRuleUpdateWithoutDependentRulesInput, ScheduleRuleUncheckedUpdateWithoutDependentRulesInput>
  }

  export type ScheduleRuleUpdateWithoutDependentRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutDependentRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
  }

  export type ScheduleRuleUpsertWithWhereUniqueWithoutDependsOnInput = {
    where: ScheduleRuleWhereUniqueInput
    update: XOR<ScheduleRuleUpdateWithoutDependsOnInput, ScheduleRuleUncheckedUpdateWithoutDependsOnInput>
    create: XOR<ScheduleRuleCreateWithoutDependsOnInput, ScheduleRuleUncheckedCreateWithoutDependsOnInput>
  }

  export type ScheduleRuleUpdateWithWhereUniqueWithoutDependsOnInput = {
    where: ScheduleRuleWhereUniqueInput
    data: XOR<ScheduleRuleUpdateWithoutDependsOnInput, ScheduleRuleUncheckedUpdateWithoutDependsOnInput>
  }

  export type ScheduleRuleUpdateManyWithWhereWithoutDependsOnInput = {
    where: ScheduleRuleScalarWhereInput
    data: XOR<ScheduleRuleUpdateManyMutationInput, ScheduleRuleUncheckedUpdateManyWithoutDependsOnInput>
  }

  export type ScheduleCreateManyProfessorInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleCreateManyProfessorInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutSchedulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutSchedulesNestedInput
    room?: RoomUpdateOneRequiredWithoutSchedulesNestedInput
    rule?: ScheduleRuleUpdateOneWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutProfessorInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyRoomInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleCreateManyRoomInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutSchedulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutSchedulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutSchedulesNestedInput
    rule?: ScheduleRuleUpdateOneWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumCreateManyCourseInput = {
    id?: string
    name: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CurriculumUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: CurriculumSubjectUpdateManyWithoutCurriculumNestedInput
    classGroups?: ClassGroupUpdateManyWithoutCurriculumNestedInput
  }

  export type CurriculumUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: CurriculumSubjectUncheckedUpdateManyWithoutCurriculumNestedInput
    classGroups?: ClassGroupUncheckedUpdateManyWithoutCurriculumNestedInput
  }

  export type CurriculumUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumSubjectCreateManyCurriculumInput = {
    subjectId: string
    module: number
  }

  export type ClassGroupCreateManyCurriculumInput = {
    id?: string
    code: string
    shift: string
    startDate: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CurriculumSubjectUpdateWithoutCurriculumInput = {
    module?: IntFieldUpdateOperationsInput | number
    subject?: SubjectUpdateOneRequiredWithoutCurriculumsNestedInput
  }

  export type CurriculumSubjectUncheckedUpdateWithoutCurriculumInput = {
    subjectId?: StringFieldUpdateOperationsInput | string
    module?: IntFieldUpdateOperationsInput | number
  }

  export type CurriculumSubjectUncheckedUpdateManyWithoutCurriculumInput = {
    subjectId?: StringFieldUpdateOperationsInput | string
    module?: IntFieldUpdateOperationsInput | number
  }

  export type ClassGroupUpdateWithoutCurriculumInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutClassGroupNestedInput
    scheduleRules?: ScheduleRuleUpdateManyWithoutClassGroupNestedInput
  }

  export type ClassGroupUncheckedUpdateWithoutCurriculumInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutClassGroupNestedInput
    scheduleRules?: ScheduleRuleUncheckedUpdateManyWithoutClassGroupNestedInput
  }

  export type ClassGroupUncheckedUpdateManyWithoutCurriculumInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    shift?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CurriculumSubjectCreateManySubjectInput = {
    curriculumId: string
    module: number
  }

  export type ScheduleCreateManySubjectInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    professorId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleCreateManySubjectInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CurriculumSubjectUpdateWithoutSubjectInput = {
    module?: IntFieldUpdateOperationsInput | number
    curriculum?: CurriculumUpdateOneRequiredWithoutSubjectsNestedInput
  }

  export type CurriculumSubjectUncheckedUpdateWithoutSubjectInput = {
    curriculumId?: StringFieldUpdateOperationsInput | string
    module?: IntFieldUpdateOperationsInput | number
  }

  export type CurriculumSubjectUncheckedUpdateManyWithoutSubjectInput = {
    curriculumId?: StringFieldUpdateOperationsInput | string
    module?: IntFieldUpdateOperationsInput | number
  }

  export type ScheduleUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutSchedulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutSchedulesNestedInput
    room?: RoomUpdateOneRequiredWithoutSchedulesNestedInput
    rule?: ScheduleRuleUpdateOneWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyClassGroupInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    subjectId: string
    professorId: string
    roomId: string
    ruleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleCreateManyClassGroupInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutClassGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutSchedulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutSchedulesNestedInput
    room?: RoomUpdateOneRequiredWithoutSchedulesNestedInput
    rule?: ScheduleRuleUpdateOneWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutClassGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutClassGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    ruleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUpdateWithoutClassGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutClassGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutClassGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyRuleInput = {
    id?: string
    startTime: Date | string
    endTime: Date | string
    status?: $Enums.ClassStatus
    cancelReason?: string | null
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleCreateManyRootRuleInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    dependsOnRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleRuleCreateManyDependsOnInput = {
    id?: string
    daysOfWeek?: ScheduleRuleCreatedaysOfWeekInput | number[]
    startTimeStr: string
    endTimeStr: string
    totalHours: number
    classGroupId: string
    subjectId: string
    professorId: string
    roomId: string
    rootRuleId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutSchedulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutSchedulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutSchedulesNestedInput
    room?: RoomUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateWithoutRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumClassStatusFieldUpdateOperationsInput | $Enums.ClassStatus
    cancelReason?: NullableStringFieldUpdateOperationsInput | string | null
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUpdateWithoutRootRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependsOn?: ScheduleRuleUpdateOneWithoutDependentRulesNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutRootRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutRootRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    dependsOnRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleRuleUpdateWithoutDependsOnInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classGroup?: ClassGroupUpdateOneRequiredWithoutScheduleRulesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScheduleRulesNestedInput
    professor?: ProfessorUpdateOneRequiredWithoutScheduleRulesNestedInput
    room?: RoomUpdateOneRequiredWithoutScheduleRulesNestedInput
    schedules?: ScheduleUpdateManyWithoutRuleNestedInput
    rootRule?: ScheduleRuleUpdateOneWithoutChildRulesNestedInput
    childRules?: ScheduleRuleUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateWithoutDependsOnInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRuleNestedInput
    childRules?: ScheduleRuleUncheckedUpdateManyWithoutRootRuleNestedInput
    dependentRules?: ScheduleRuleUncheckedUpdateManyWithoutDependsOnNestedInput
  }

  export type ScheduleRuleUncheckedUpdateManyWithoutDependsOnInput = {
    id?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: ScheduleRuleUpdatedaysOfWeekInput | number[]
    startTimeStr?: StringFieldUpdateOperationsInput | string
    endTimeStr?: StringFieldUpdateOperationsInput | string
    totalHours?: IntFieldUpdateOperationsInput | number
    classGroupId?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    professorId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    rootRuleId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}