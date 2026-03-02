// Always mock firebase in every test
jest.mock("../src/config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
        doc: jest.fn(),
    },
}));

// Reset all mocks after each test to ensure a clean slate
afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});