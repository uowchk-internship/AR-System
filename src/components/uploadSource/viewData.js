import { Table, ScrollArea } from '@mantine/core';
import { tab } from '@testing-library/user-event/dist/tab';
import { useState, useEffect } from 'react'

export default function ViewDataCompoment(props) {
    let displayData = props.displayData

    const [loaded, setLoaded] = useState(false)
    const [tableItem, setTableItem] = useState("")
    const [titleItem, setTitleItem] = useState([])
    console.log(JSON.stringify(displayData))

    // useEffect(() => {
    //     if (displayData.length > 0 && !loaded) {
    //         let tableHTML = ""
    //         for (let item of displayData) {
    //             tableHTML += "<tr>"

    //             for (let item_ of Object.keys(item)) {
    //                 tableHTML += `<td>${item[item_]}</td>`
    //             }

    //             tableHTML += "</tr>"
    //         }

    //         document.getElementById("tableBody").innerHTML = tableHTML

    //         setLoaded(true)
    //     }
    // })
    if (displayData.length > 0) {
        if (!loaded) {
            setTitleItem(Object.keys(displayData[0]))
            setLoaded(true)
        }
        return (
            <>
                <div style={{ textAlign: 'left' }}>
                    <pre>{JSON.stringify(displayData, null, '\t')}</pre>

                </div>
                {/* <ScrollArea> */}
                {/* <Table component={ScrollArea}>
                    <thead>
                        <tr>
                            {[...Object.keys(displayData[0])].map((item, key) => {
                                return (
                                    <th key={key}>{item}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <ScrollArea>
                        <tbody>
                            {[...displayData].map((item, i) => {

                                return (
                                    <tr key={i}>
                                        {[...titleItem].map((title, i_) => {
                                            return (
                                                <td key={i_}>{item[title]}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </ScrollArea>
                </Table> */}
                {/* </ScrollArea> */}
            </>
        )

    }
}