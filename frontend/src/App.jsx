import { useState } from 'react';

import './App.css';
import { Home } from './components/Home';
import { Popup } from './components/ui/Popup';
import { DrivingTestResultForm } from './components/forms/DrivingTestResultForm';
import { Button } from './components/ui/Button';
import { useForm } from 'react-hook-form';

function App() {

  const [openForm, setOpenForm] = useState(false);
  

  const methodsForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      time: "",
      physicalTest: {
        colorBlind: "", // ตาบอดสี (ผ่าน/ไม่ผ่าน)
        longSight: "", // สายตายาว (ผ่าน/ไม่ผ่าน)
        astigmatism: "", // สายตาเอียง (ผ่าน/ไม่ผ่าน)
        reactionTest: "", // การตอบสนองร่างกาย (ผ่าน/ไม่ผ่าน)
      },
      theoryTest: {
        billBoard: "", // ป้ายจราจร
        trafficLines: "", // เส้นจราจร
        givingWay: "" // การให้ทาง
      },
      practiceExam: "" // สอบปฏิบัติ (ผ่าน/ไม่ผ่าน)
    }
  });

  return (
    <>
      <div className=''>
        <Button
          onClick={() => setOpenForm(true)}
        >
          บันทึกข้อมูล
        </Button>
        <Popup
          isOpen={openForm}
          onClose={() => {setOpenForm(false); methodsForm.reset()}}
          header={"Form บันทึกข้อมูลผู้ทำใบขับขี้"}
          height={"720px"}
          width={"780px"}
          submitText={"บันทึกข้อมูล"}
          onSubmit={methodsForm.handleSubmit((data) => console.log(data))}
        >
          <DrivingTestResultForm methods={methodsForm} />
        </Popup>
      </div>
      <div>
        <Home />
      </div>
    </>
  )
}

export default App
