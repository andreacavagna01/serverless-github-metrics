import { DynamoDB } from 'aws-sdk';
import {Metrics} from "./scrape/dto";


export async function write(table: string, metrics: Metrics): Promise<any> {
    const today = new Date()
    const calendar = { date: today.toISOString().substring(0,10) }

    const item = { ...calendar, ...metrics.globals}

    let releasesItems: any[];
    releasesItems = [];
    metrics.releases.forEach( release => {
        const releaseItem = {
            releaseComp: `${release.name}`,
            date: calendar.date,
            downloads: release.downloads,
            updates: release.updates,
            latest: release.latest
        }
        releasesItems.push(releaseItem);
    })

    const dynamo = new DynamoDB.DocumentClient({apiVersion: '2012-08-10', region: 'eu-west-1'});
    await dynamo.put({
        TableName: table,
        Item: item
    }).promise();

    for (const releaseItem of releasesItems) {
        await dynamo.put({
            TableName: table+'-releases',
            Item: releaseItem
        }).promise();
    }
}
