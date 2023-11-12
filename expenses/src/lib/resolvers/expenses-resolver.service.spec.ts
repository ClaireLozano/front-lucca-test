import { TestBed } from '@angular/core/testing'

import { ExpensesResolver } from './expenses-resolver.service'

describe('ExpensesResolver', () => {
    let service: ExpensesResolver

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(ExpensesResolver)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
