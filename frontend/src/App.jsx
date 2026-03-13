import { useState, useEffect } from 'react';

import './App.css';
import { Home } from './components/Home';
import { Popup } from './components/ui/Popup';
import { DrivingTestResultForm } from './components/forms/DrivingTestResultForm';
import { Button } from './components/ui/Button';
import { useForm } from 'react-hook-form';

import { useAddDrivingLicense, useDeleteDrivingLicense } from './modules/drivingLicense/drivingLicense.mutation.js';
import { useDrivingLicense, useDrivingLicenseById } from './modules/drivingLicense/drivingLicense.query.js';
import { defaultFormValues } from './modules/drivingLicense/drivingLicense.defaultValues.js';

import Swal from 'sweetalert2';

function App() {

  const [openForm, setOpenForm] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const methodsForm = useForm({
    defaultValues: defaultFormValues
  });


  const mapDrivingToForm = (data) => {
    if (!data) return {};

    const bitToText = (value) => {
      if (value === null || value === undefined) return "";
      return value ? "ผ่าน" : "ไม่ผ่าน";
    };

    return {
      firstName: data.first_name ?? "",
      lastName: data.last_name ?? "",
      time: data.exam_time ?? "",

      physicalTest: {
        colorBlind: bitToText(data.color_blind),
        longSight: bitToText(data.long_sight),
        astigmatism: bitToText(data.astigmatism),
        reactionTest: bitToText(data.reaction_test)
      },

      theoryTest: {
        billBoard: data.bill_board ?? "",
        trafficLines: data.traffic_lines ?? "",
        givingWay: data.giving_way ?? ""
      },

      practiceExam: bitToText(data.practice_exam)
    };
  };

  const { data: dataDriving } = useDrivingLicense();
  // console.log(dataDriving?.data);

  const dataAllDriving = dataDriving?.data || [];

  const { mutateAsync: onSubmitDriving } = useAddDrivingLicense({
    onReset: () => methodsForm.reset(defaultFormValues),
    onClose: () => setOpenForm(false),
    onSelect: () => setSelectedId(null),
  });


  const { data: dataDrivingByid } = useDrivingLicenseById(selectedId);
  // console.log(dataDrivingByid?.data)

  const onEditId = (id) => {
    // console.log(id)
    setSelectedId(id);
    setOpenForm(true);
  };

  useEffect(() => {
    if (dataDrivingByid?.data) {
      methodsForm.reset(mapDrivingToForm(dataDrivingByid.data));
    }
  }, [dataDrivingByid?.data, methodsForm]);
  // console.log(dataDrivingByid);

  const { mutate: deleteDriving } = useDeleteDrivingLicense();

  const onDelete = (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูลนี้หรือไม่?",
      text: "การลบไม่สามารถย้อนกลับได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDriving(id);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-starts gap-6 p-18">
      <div className="w-180">
        <div className=" w-full flex items-center justify-between mb-6 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            โปรเเกรมบันทึกผู้สมัครใบขับขี่
          </h2>
          <div>
            <Button
              onClick={() => setOpenForm(true)}
            >
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
        <Popup
          isOpen={openForm}
          onClose={() => { setOpenForm(false); methodsForm.reset(defaultFormValues); setSelectedId(null); }}
          header={selectedId ? "From เเก้ไขข้อมูลผู้ทำใบขับขี่" : "Form บันทึกข้อมูลผู้ทำใบขับขี่"}
          height={"720px"}
          width={"780px"}
          submitText={selectedId ? "เเก้ไขข้อมูล" : "บันทึกข้อมูล"}
          onSubmit={methodsForm.handleSubmit(async (data) => {
            await onSubmitDriving({
              id: selectedId,
              ...data
            });
            methodsForm.reset(defaultFormValues);
          })}
        >
          <DrivingTestResultForm methods={methodsForm} />
        </Popup>
      </div>
      <div className="w-250">
        <Home
          dataAll={dataAllDriving}
          selectEditId={onEditId}
          selectDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default App
