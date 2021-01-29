import { Scraper } from '../src/scrape/scrape';

import 'mocha';

import * as dotenv from 'dotenv';
import {fromPromise} from "rxjs/internal-compatibility";
import {tap} from "rxjs/operators";

dotenv.config()


describe('Test Scraper',
    () => {
        it('should return true', () => {
            const s = new Scraper(process.env.OWNER, process.env.REPO, process.env.AUTH)
            const metrics = fromPromise(s.scrape()).pipe(
                tap(console.log)
            ).subscribe((metrics) => {
                return metrics;
            })
        });
    });
