<template>
  <div>
    <v-container style="background-color:#7de673;">
      <div class="checkbox">
        <input type="checkbox" required>
        <label for="agree">   ท่านต้องการบริการรับบริการเสริม SMS  แจ้งข่าวสารความเคลื่อนไหวการสมัครสอบของหน่อยงานหรือไม่ <br>
          (ค่าบริการเสริมจาก INET 20 บาท โดยบริการเสริมที่ไม่เกี่ยวข้อง กับ สำนักงานคณะกรรมการศึกษาขั้นพื้นฐาน)</label>
      </div>
      <br>
      <v-row>
        <v-col md="4">
          เบอร์โทรศัพท์ :
          <validation-provider
            v-slot="{ errors }"
            name="telephone"
            rules="required|numeric"
          >
            <v-text-field
              v-model="telephone"
              outlined
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
        <v-col md="4">
          email :
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required"
          >
            <v-text-field
              v-model="email"
              outlined
              :error-messages="errors"
              style="background-color: whitesmoke; height: 50%;"
            />
          </validation-provider>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-container fluid>
          <div>
            <input type="checkbox" required>
            ข้าพเจ้าขอยอมรับว่า ข้าพเจ้าเป็นผู้มีคุณสมบัติทั่วไปตามมาตรา 30 แห่งพระราชบัญญัติระเบียบข้าราชการครูและบุคลากรทางการศึกษา  พ.ศ. 2547 และที่แก้ไขเพิ่มเติม <br>
            และมีตุณสมบัติอื่นครบถ้วนตามประกาศรับสมัคร ข้อความดังกล่าวข้างต้นนี้เป็นความจริงทุกประการ  หากไม่เป็นความจริงให้ถือว่า ข้าพเจ้าไม่มีสิทธิสอบแข่งขันในครั้งนี้
            และจะ <br>เรียกร้องสิทธิใดๆ ในภายหลังทั้งสิ้น
          </div>
        </v-container>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12">
          <center>
            กรุณาตรวจสอบข้อมูลอีกครั้ง  ก่อนกดปุ่ม
            <v-btn
              class="mr-4"
              type="submit"
              style="background-color: #0066FF;
            "
            >
              Submit
            </v-btn>
            โดยเฉพาะเลขบัตรประชาชน และ ชื่อ  -  นามสกุล
          </center>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      telephone: '',
      email: ''

    }
  }
}

</script>
