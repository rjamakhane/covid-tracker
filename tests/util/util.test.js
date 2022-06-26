import { formatNumbers, filterItems, stableSort, descendingComparator } from '../../src/util';

describe('Utils', () => {
    const countriesList = [{
        "Country": "Afghanistan",
        "NewConfirmed": 0,
        "TotalConfirmed": 12,
    }, {
        "Country": "India",
        "NewConfirmed": 9,
        "TotalConfirmed": 45,
    }, {
        "Country": "Indonesia",
        "NewConfirmed": 6,
        "TotalConfirmed": 6,
    }, {
        "Country": "USA",
        "NewConfirmed": 2,
        "TotalConfirmed": 12,
    }]
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('formatNumbers should format number to localstring', async () => {
        expect(formatNumbers(123456)).toBe('123,456')
    });

    const filterTestSet = [
        {
            countriesList,
            searchValue: "Ind",
            field: "Country",
            expectedCount: 2
        },
        {
            countriesList,
            searchValue: "India",
            field: "Country",
            expectedCount: 1
        },
        {
            countriesList,
            searchValue: "Afghanistan",
            field: "Country",
            expectedCount: 1
        },
        {
            countriesList,
            searchValue: "12",
            field: "TotalConfirmed",
            expectedCount: 2
        },

    ]

    test.each(filterTestSet)('should filter $searchValue and return $expectedCount items', ({ countriesList, field, searchValue, expectedCount }) => {
        expect(filterItems(countriesList, field, searchValue).length).toBe(expectedCount)
    })

    test("stableSort - sort the items in asc order", () => {
        const items = [{ "Country": "India" },{ "Country": "India" }, { "Country": "Afghanistan" }, { "Country": "USA" }, { "Country": "Indonesia" }];
        const sortedItems = stableSort(items, (a, b) => {
            return -descendingComparator(a, b, "Country")
        });
        expect(sortedItems).toStrictEqual([
            { "Country": "Afghanistan" },
            { "Country": "India" },
            { "Country": "India" },
            { "Country": "Indonesia" },
            { "Country": "USA" }
        ])
    })



});

