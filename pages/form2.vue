<template>
  <div>
    <h1 style="background-color: #7de673">
      ขั้นตอนที่ 1 : กรอกข้อมูลเป็นภาษาไทยให้ครบทุกข้อและสมบูรณ์
    </h1>
    <v-container fluid>
      <v-row>
        <v-col md="4">
          จังหวัด :
          <validation-provider
            v-slot="{ errors }"
            name="provinces"
            rules="required"
          >
            <v-text-field
              v-model="provinces"
              outlined
              disabled
              placeholder="ราชบุรี"
              :error-messages="errors"
            />
          </validation-provider>
        </v-col>
        <v-col md="4">
          เขตพื้นที่ :
          <validation-provider
            v-slot="{ errors }"
            name="subdistrict"
            rules="required"
          >
            <v-text-field
              v-model="subdistrict"
              outlined
              placeholder="เขต 2"
              disabled
              :error-messages="errors"
            />
          </validation-provider>
        </v-col>
      </v-row>
    </v-container>

    <v-container style="background-color: #7de673;">
      <v-row>
        <v-col md="4">
          คำนำหน้า :
          <validation-provider
            v-slot="{ errors }"
            name="title"
            rules="required"
          >
            <v-select
              v-model="title"
              outlined
              placeholder="เลือกคำนำหน้า"
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
        <v-col md="4">
          ชื่อ :
          <validation-provider
            v-slot="{ errors }"
            name="firstname"
            rules="required"
          >
            <v-text-field
              v-model="firstname"
              outlined
              placeholder="กรอกชื่อ"
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
        <v-col md="4">
          นามสกุล :
          <validation-provider
            v-slot="{ errors }"
            name="lastname"
            rules="required|numeric"
          >
            <v-text-field
              v-model="lastname"
              outlined
              placeholder="กรอกนามสกุล"
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2">
          เพศ :
          <validation-provider
            v-slot="{ errors }"
            name="gender"
            rules="required"
          >
            <v-select
              v-model="gender"
              outlined
              placeholder="เลือกเพศ"
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
              :items="['ชาย', 'หญิง']"
            />
          </validation-provider>
        </v-col>
        <v-col md="2">
          สัญชาติ :
          <validation-provider
            v-slot="{ errors }"
            name="nationality"
            rules="required"
          >
            <v-text-field
              v-model="nationality"
              outlined
              placeholder="ไทย"
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
        <v-col md="2">
          เชื้อชาติ :
          <validation-provider
            v-slot="{ errors }"
            name="ethnicity"
            rules="required|numeric"
          >
            <v-text-field
              v-model="ethnicity"
              outlined
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
        <v-col md="2">
          ศาสนา :
          <validation-provider
            v-slot="{ errors }"
            name="religion"
            rules="required"
          >
            <v-text-field
              v-model="religion"
              outlined
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
        <v-col md="2">
          สถานภาพ :
          <validation-provider
            v-slot="{ errors }"
            name="status"
            rules="required"
          >
            <v-select
              v-model="status"
              outlined
              placeholder="เลือกสถานะ"
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
              :items="['โสด', 'สมรส', 'หย่าล้าง']"
            />
          </validation-provider>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col md="4">
          วัน เดือน ปี เกิด
          <validation-provider
            v-slot="{ errors }"
            name="birth_date"
            rules="required|numeric"
          >
            <v-text-field
              v-model="birth_date"
              outlined
              placeholder="วว-ดด-ปปปป (เช่น 26-04-2541)"
              :error-messages="errors"
            />
            <p style="color: red">
              (อายุต้องไม่ต่ำกว่า 18 ปี นับถึงวันปิดรับสมัครใยวันที่ 14 พฤษภาคม 2567)
            </p>
          </validation-provider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      provinces: '',
      subdistrict: '',
      title: '',
      firstname: '',
      lastname: '',
      gender: '',
      nationality: '',
      ethnicity: '',
      religion: '',
      status: ''
    }
  }
}
</script>
