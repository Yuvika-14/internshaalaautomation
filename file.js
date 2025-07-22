const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null
        });

        let page = await browser.newPage();
        await page.goto("https://internshala.com");

        // Click on the login button to open the modal
        //<button data-toggle="modal" data-target="#login-modal" class="login-cta">Login</button>
        await waitAndClick(".login-cta", page);

        // Wait for the login modal to appear
        await page.waitForSelector("input[name='email']", { visible: true })
        // Enter login credentials
        /* await page.type("input[name='email']", "bawiwe8129@kuandika.com", { delay: 150 });
         await page.type("input[name='password']", "223344", { delay: 250 });
 */
await page.type("input[name='email']", "kapara7978@oziere.com", { delay: 150 });
 await page.type("input[name='password']", "111111", { delay: 250 });
       // await page.type("input[name='email']", "hicox80732@egvoo.com", { delay: 150 });
        //await page.type("input[name='password']", "444444", { delay: 250 });
        // Click the login butt
        //<button type="submit" class="btn btn-primary" id="modal_login_submit" tabindex="3">Login</button>
        await waitAndClick("#modal_login_submit", page);
        //<button class="btn btn-large" id="apply_now_button" fdprocessedid="mxc396">
        //  Apply now                                </button>

        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Wait for an element that indicates a successful login (internships tab visible)
        await page.waitForSelector('a.nav-link.dropdown-toggle.internship_link#internships_new_superscript', { timeout: 90000 });

        // Click on the internships tab **AFTER login is successful**
        await waitAndClick('a.nav-link.dropdown-toggle.internship_link#internships_new_superscript', page);
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.click('#select_category_chosen');

        // Open the dropdown

        // 2. Wait for the search box inside the dropdown to be visible
        await page.waitForSelector('#select_category_chosen input[type="text"]', { visible: true, delay: 350 });

        // 3. Type "Computer Science" in the search box
        await page.type('#select_category_chosen input[type="text"]', 'Computer Science', { delay: 300 });

        // 4. Wait for the options to filter, and then select the "Computer Science" option
        await page.waitForSelector('#select_category_chosen li.active-result', { visible: true });
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.waitForSelector('.internship_meta', { visible: true, timeout: 90000 });

        // Scroll down to load all internships (for infinite scrolling)
        // ✅ Function is now properly defined before this call

        // Wait a bit for DOM updates
        await page.goto("https://internshala.com/internships/computer-science-internship", { waitUntil: 'networkidle2' });
        // await page.waitForTimeout(5000); // Allow some time for internships to load

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));
        const internshipLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.individual_internship'))
                .map(div => div.querySelector('a')?.href) // Extract link inside the div
                .filter(link => link); // Remove null values
        });
        console.log(internshipLinks); // Prints extracted internship links
        
           // console.log("Navigating to:", https://internshala.com${newInternshipLink});
            
           for (let link of internshipLinks) {
            await page.goto(link);
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));

            await page.waitForSelector('#easy_apply_button',{visible :true});

            await page.click('#easy_apply_button'); 
        
            // Fill out application form (if needed)
           // await page.waitForSelector('.education_incomplete.proceed-btn', { visible: true });
            //await page.click('.education_incomplete.proceed-btn');
            //console.log("✅ Proceed button clicked successfully!");
            await new Promise(resolve => setTimeout(resolve, 5000))
            //Wait for the cover letter editor to appear
         // Wait for the cover letter editor to appear
//ynamically Handle File Upload (if exists)
await page.waitForSelector("#form-container", { timeout: 10000 });
await new Promise(resolve => setTimeout(resolve, 2000)); // Small delay before interaction

// ✅ Handle ALL Textareas
const textareas = await page.$$("textarea.custom-question-answer");
for (const textarea of textareas) {
    await textarea.focus();  // Ensure focus before typing
    await page.evaluate(el => el.value = "", textarea); // Clear existing text if any
    await textarea.type("I believe that I am a good fit for this role because my expeirnce in the folloiwng tech stacks perfectly aligns with the company's requirement.Additionally I have gained valuable experience as a summer interms at NS.", { delay: 50 });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay after typing
}
//ql-editor ql-blank
// ✅ Handle Quill.js Editors
const quillEditors = await page.$$(".ql-editor[contenteditable='true']");
for (const editor of quillEditors) {
    await editor.focus(); // Focus on the editor
    await page.evaluate(el => {
        el.innerHTML = ""; // Clear existing content
    }, editor);
    await page.type(".ql-editor[contenteditable='true']", "I believe that I am a good fit for this role because my expeirnce in the folloiwng tech stacks perfectly aligns with the company's requirement.Additionally I have gained valuable experience as a summer interms at NS.", { delay: 50 });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay after typing
}


const radioGroups = await page.evaluate(() => {
    const radios = document.querySelectorAll("input[type='radio'].custom-question-answer");
    return Array.from(radios).map(r => r.name); // Get all unique radio groups
});

const uniqueRadioGroups = [...new Set(radioGroups)]; // Remove duplicates

for (const groupName of uniqueRadioGroups) {
    const radios = await page.$$(`input[name='${groupName}']`);
    for (const radio of radios) {
        const value = await page.evaluate(el => el.value, radio);
        if (value.toLowerCase() === "yes") { // Change logic if needed
            await radio.click();
            await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay
            break; // Stop after selecting one
        }
    }
}
// ✅ Check if Chosen.js Dropdown Exists
// ✅ Handle Chosen.js Dropdown
/*const dropdownSelector = "#custom_question_range_6115750_chosen";
await page.waitForSelector(dropdownSelector);
await page.click(dropdownSelector); // Open the dropdown
D:\internautomation\file.js
// ✅ Select "5" from the dropdown
const optionSelector = "#custom_question_range_6115750_chosen .chosen-results li[data-option-array-index='5']";
await page.waitForSelector(optionSelector);
await page.click(optionSelector); // Select "5"
*/
await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay


// ✅ Click Submit Button (Find dynamically)
const submitSelectors = ["#submit", "input[type='submit']", "button[type='submit']"];
for (const selector of submitSelectors) {
    if (await page.$(selector)) {
        await new Promise(resolve => setTimeout(resolve, 5000)) // Small delay before submission
        await page.click(selector);
        await new Promise(resolve => setTimeout(resolve, 5000)) // Wait after clicking submit
        break;
    }
}
           }
       

    console.log("✅ Script executed successfully!");// Wait for application to submit
          
         
            // Click the button
            // await page.click('.btn.btn-large.education_incomplete.proceed-btn');
            await new Promise(resolve => setTimeout(resolve, 5000));


            console.log('Clicked on Add Internship button!');
            await new Promise(resolve => setTimeout(resolve, 5000));
          //  await page.waitForSelector("#upload-resume-modal-close", { visible: true, timeout: 5000 });
            //await page.click("#upload-resume-modal-close");
            console.log("Resume upload modal closed successfully!");
            // Fill internship detailsawait new Promise(resolve => setTimeout(resolve, 5000));
           
            await new Promise(resolve => setTimeout(resolve, 5000))
           
    await browser.close();
} catch (error) {
    console.error("❌ Error:", error);
}
})();

    // Improved function to wait for an element before clicking
    async function waitAndClick(selector, cpage) {
        try {
            await cpage.waitForSelector(selector, { visible: true });
            await cpage.click(selector);
        } catch (err) {
            console.error(`Error clicking on ${selector}:`, err);
        }
    }
    

    

       // await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));
        // Wait for the close button to be visible
        //  await page.waitForSelector("#upload-resume-modal-close", { visible: true });

        // Click the close button
        // await page.click("#upload-resume-modal-close");

        // console.log("Resume upload modal closed successfully!");
        // Open the modal<div class="add_more_item_container" data-toggle="modal" data-dismiss="modal" data-target="#por-modal" id="por-resume">

      


        /* // Fill internship detailsawait new Promise(resolve => setTimeout(resolve, 5000));
         await page.waitForSelector('[data-target="#internship-job-modal"]', { visible: true });
         await page.click('[data-target="#internship-job-modal"]');
         await new Promise(resolve => setTimeout(resolve, 5000));
         ;
         await page.waitForSelector("#experience_designation", { visible: true });
         await page.click("#experience_designation");
 
         await page.evaluate(() => document.querySelector("#experience_designation").value = "");
         await page.type("#experience_designation", "Frontend Developer", { delay: 200 });
         await new Promise(resolve => setTimeout(resolve, 5000));
         await page.waitForSelector("#experience_profile", { visible: true });
         await page.click("#experience_profile"); // Ensure focus
         await page.evaluate(() => document.querySelector("#experience_profile").value = ""); // Clear existing text
         await page.type("#experience_profile", "Full Stack Developer", { delay: 200 });
         // Increased delay
         await new Promise(resolve => setTimeout(resolve, 5000));
         await page.waitForSelector("#experience_organization", { visible: true });
         await page.click("#experience_organization");
 
         await page.evaluate(() => document.querySelector("#experience_organization").value = "");
         await page.type("#experience_organization", "Mecon", { delay: 300 });
 
         // Click checkboxes
        
 
         await page.click("#experience_is_work_from_home");
         await new Promise(resolve => setTimeout(resolve, 5000));
 
 
         // Wait for the date input box and click to open the calendar
 
 
         // Wait for the calendar to appear
         // Click "Work from Home" checkbox
 
 
         // Wait for the start date input box and ensure it's visible
         await page.waitForSelector("#experience_start_date", { visible: true });
         await page.focus("#experience_start_date");  // Ensure focus
         await page.click("#experience_start_date");
 
         // Wait for calendar to load properly
         // Ensure the date picker appears
         // Wait for the datepicker to be visible
         await page.waitForSelector(".ui-datepicker", { visible: true });
         await new Promise(resolve => setTimeout(resolve, 5000));
  // Extra wait to ensure UI updates
 
         // Select Year and Month
         await page.evaluate(() => {
             let yearSelect = document.querySelector('.ui-datepicker-year');
             let monthSelect = document.querySelector('.ui-datepicker-month');
 
             if (yearSelect && monthSelect) {
                 yearSelect.value = "2025";
                 monthSelect.value = "2";  // March (0-based index)
                 yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
                 monthSelect.dispatchEvent(new Event('change', { bubbles: true }));
             }
         });
 
         await new Promise(resolve => setTimeout(resolve, 5000));
         // Wait to ensure the calendar updates
 
         // Click the 4th of March 2025 using Puppeteer's `click()`
         await page.waitForSelector('td[data-handler="selectDay"][data-month="2"][data-year="2025"] a', { visible: true });
         await page.click('td[data-handler="selectDay"][data-month="2"][data-year="2025"] a');
 
         // Alternative: Click using `evaluate()`
         await page.evaluate(() => {
             let dateElement = document.querySelector('td[data-handler="selectDay"][data-month="2"][data-year="2025"] a');
             if (dateElement) {
                 dateElement.click();
                 dateElement.dispatchEvent(new Event('click', { bubbles: true })); // Force click event
                 console.log("✅ Date clicked successfully!");
             } else {
                 console.error("❌ Date not found!");
             }
         });
 
         // Wait for the date field to be populated
         await new Promise(resolve => setTimeout(resolve, 5000));
         
         const selectedDate = await page.$eval("#experience_start_date", el => el.value);
         if (!selectedDate) {
             throw new Error("❌ Date not selected properly!");
         }
         console.log(`✅ Date Selected: ${selectedDate}`);
 
         // Confirm selection
         await new Promise(resolve => setTimeout(resolve, 5000));
 
         console.log("✅ Start Date Selected!");
 
 
         // Ensure experience is ongoing checkbox is checked
         await page.waitForSelector("#experience_on_going", { visible: true });
         await page.click("#experience_on_going");
 
         // Type description in paragraph
         await page.waitForSelector('.note-editable', { visible: true });
         await page.click('.note-editable');
         await page.evaluate(() => document.querySelector('.note-editable').innerText = ""); // Clear previous text
 
         const text = "I worked as a fullstack developer at Mecon. I built a Gatepass Management system...";
         for (const char of text) {
             await page.type('.note-editable', char, { delay: 50 }); // Simulating human typing
         }
 
         await new Promise(resolve => setTimeout(resolve, 5000)); // Keep open for debugging
         await page.waitForSelector('.btn.education_incomplete.proceed-btn');
 
         // Click the button
         await page.click('.btn.education_incomplete.proceed-btn');
     
 
         console.log("✅ 'Save' button clicked successfully!");
 
         // Optionally, wait for any page updates or messages after saving
         await new Promise(resolve => setTimeout(resolve, 5000));
         await page.waitForSelector('#por-resume', { visible: true });
         await page.click('#por-resume');
         console.log("✅ Clicked on 'Add extra curricular activities'");
 
         // Wait for POR modal to appear
         await page.waitForSelector('#por-modal', { visible: true });
         console.log("✅ POR Modal opened successfully!");
 
         // Select the text box inside #por-modal
         await page.waitForSelector('#por-modal .note-editable', { visible: true });
         await page.evaluate(() => {
             const editor = document.querySelector('#por-modal .note-editable');
             if (editor) {
                 editor.innerText = "";
                 editor.focus();
             }
         });
 
         // Type the first text inside POR modal
         const porText = "I am a mentee at Codess Cafe, which is a community to support women in tech.";
         await page.evaluate((porText) => {
             const editor = document.querySelector('#por-modal .note-editable');
             if (editor) {
                 document.execCommand('insertText', false, porText);
             }
         }, porText);
 
         console.log("✅ POR text inserted successfully!");
 
         // Small delay to ensure processing
         await new Promise(resolve => setTimeout(resolve, 5000)); // Keep open for debugging
 
         await page.waitForSelector('#por-submit', { visible: true });
 
         // Click the "Save" button
         await page.click('#por-submit');
         console.log("Save button clicked succesfully");
 
 
 
 
         // Optionally, wait for any page updates or form submission
         await new Promise(resolve => setTimeout(resolve, 5000));
 
         await page.waitForSelector('#project-resume', { visible: true });
         await page.click('#project-resume');
         console.log("✅ Clicked on 'Add extra curricular activities'");
 
         // Wait for POR modal to appear
         await page.waitForSelector('#project-modal', { visible: true });
         console.log("✅ Project Modal opened successfully!");
         await new Promise(resolve => setTimeout(resolve, 5000));
         // Fill internship details
         await page.waitForSelector("#other_experiences_title", { visible: true });
         await page.click("#other_experiences_title"); // Ensure focus
         await page.evaluate(() => document.querySelector("#other_experiences_title").value = ""); // Clear existing text
         await page.type("#other_experiences_title", "Finding Mato", { delay: 200 }); //    
         // Wait for the date input box and click to open the calendar
         await page.waitForSelector("#other_experiences_project_start_date", { visible: true });
         await page.click("#other_experiences_project_start_date");
 
         // Wait for the calendar to appear
         await page.waitForSelector(".ui-datepicker", { visible: true });
 
         // Select year and month (February 2023)
         await page.evaluate(() => {
             // Ensure year and month are correct (set month to February, year to 2023)
             let yearSelect = document.querySelector('.ui-datepicker-year');
             let monthSelect = document.querySelector('.ui-datepicker-month');
 
             if (yearSelect) {
                 yearSelect.value = "2024"; // Set year to 2023
                 yearSelect.dispatchEvent(new Event('change')); // Dispatch event to update the calendar
             }
 
             if (monthSelect) {
                 monthSelect.value = "5"; // February (0 = Jan, 1 = Feb, ...)
                 monthSelect.dispatchEvent(new Event('change')); // Dispatch event to update the calendar
             }
         });
 
         //<input tabindex="4" type="checkbox" id="other_experiences_project_is_on_going" name="is_on_going">
 
         // Wait for calendar to update after month/year change
 
         await new Promise(resolve => setTimeout(resolve, 5000))
         // Select the 3rd February 2023 based on the "y-m-date" format
         await page.evaluate(() => {
             // Change selector to match the date format "y-m-date"
             let dateElement = document.querySelector('td[data-handler="selectDay"][data-month="1"][data-year="2024"] a');
             if (dateElement) {
                 dateElement.click(); // Click the 3rd of February 2023
             } else {
                 console.error("Date not found!");
             }
         });
         await page.click("#other_experiences_project_is_on_going");
         await new Promise(resolve => setTimeout(resolve, 5000))
         await page.waitForSelector('#project-submit', { visible: true });
         await page.click('#project-submit');
         await new Promise(resolve => setTimeout(resolve, 5000))
         await page.waitForSelector('.education_incomplete.proceed-btn', { visible: true });
         await page.click('.education_incomplete.proceed-btn');
         console.log("✅ Proceed button clicked successfully!");
         await new Promise(resolve => setTimeout(resolve, 5000))
         // Wait for the cover letter editor to appear
   /*      await page.waitForSelector('#cover_letter_container', { visible: true });
         await new Promise(resolve => setTimeout(resolve, 5000))
         // Click on the editor to focus
         await page.click('#cover_letter_container');
 
         // Define the cover letter text
         const coverLetterText = `I am an enthusiastic and dedicated software developer with a strong background in React.js, Node.js, and MongoDB. My passion for solving real-world problems through technology makes me a great fit for this role. 
 ingfully to your team.`;
 
         // Type the cover letter with a human-like delay
         for (const char of coverLetterText) {
             await page.type('#cover_letter_container', char, { delay: 50 }); // Adjust delay (50ms) for more natural typing
         }
 
         console.log("✅ Cover letter typed successfully!");
 
         // OPTIONAL: Wait before submission (for debugging)
         await new Promise(resolve => setTimeout(resolve, 3000));
 
         // Click the submit button if it exists (update selector if needed)
         await page.click("#radio1");
         await new Promise(resolve => setTimeout(resolve, 3000));
         await page.waitForSelector('#custom_question_text_5981851', { visible: true });
 
         // Click inside the textarea to focus
         await page.click('#custom_question_text_5981851');
 
         // Define the response to the question
         const answerText = `Quality assurance (QA) in the ed-tech sales industry ensures that educational products and services meet high standards before reaching customers. QA helps in detecting issues early, leading to a smoother user experience and increased customer satisfaction.
 
 Bality services.`;
 
         // Type the answer in the textarea with human-like typing speed
         for (const char of answerText) {
             await page.type('#custom_question_text_5981851', char, { delay: 50 }); // Simulating human typing
         }
 
 
         // OPTIONAL: Wait before submission (for debugging)
         await new Promise(resolve => setTimeout(resolve, 3000));
         await page.click('#custom_question_range_5981852_chosen');
 
         await page.waitForSelector('.chosen-results');
 
         // Add delay to ensure the dropdown remains open
 
 
         await page.evaluate(() => {
             const options = [...document.querySelectorAll('.chosen-results li')];
             const optionToSelect = options.find(option => option.innerText.trim() === '5');
             if (optionToSelect) {
                 optionToSelect.scrollIntoView();
                 optionToSelect.dispatchEvent(new Event('mouseenter', { bubbles: true }));
                 optionToSelect.click();
             }
         });
 

        await page.evaluate(() => {
            const select = document.querySelector('#custom_question_range_11_choosen');
            select.value = "5";
            select.dispatchEvent(new Event("change", { bubbles: true }));
            $(select).trigger("chosen:updated"); // If jQuery is available
        });
*/

        // Optional: Wait to see the result before closing the browser


        // Wait for the options to be visible




        // Submit the form if required (modify selector accordingly)


    
