// function EventCards({ events, index }: { events: EventData[]; index: number }) {
//   return (
//     <div className="grid grid-cols-4 gap-3">
//       {events.length === 0 && index === 1 ? (
//         <div className="col-span-4 flex justify-center items-center">
//           <Image src={no_event} alt="No events yet."/>
//         </div>
//       ) : (
//         events.map((event, idx) => (
//           <div key={idx}>
//             <Link href={`/myEvents/${idx + 1}`}>
//               <Card style={{ width: 300 }}
//                 cover={// eslint-disable-next-line @next/next/no-img-element
//                   <img
//                     alt="example"
//                     src="https://creativesilhouettes.ca/wp-content/uploads/2021/07/pink-magnolia-flower_pattern.jpg"
//                   />}>
//                 <Meta title={event.name} description={event.date} />
//               </Card>
//             </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

export function EventGrid() {
  return(
    <>Hello from event grid</>
  );
}
