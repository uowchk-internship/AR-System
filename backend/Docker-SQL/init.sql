Create database `ar-source`;
USE `ar-source`;
create table argo10
(
    id                      int auto_increment
        primary key,
    cohort                  varchar(255)  null,
    internal_id             varchar(255)  null,
    student_id              varchar(255)  null,
    last_name               varchar(255)  null,
    first_name              varchar(255)  null,
    middle_name             varchar(255)  null,
    enrol_year_term         varchar(255)  null,
    prog_code               varchar(255)  null,
    stud_status             varchar(255)  null,
    dept_code               varchar(255)  null,
    block_code              varchar(255)  null,
    shrtckn_term_code       varchar(255)  null,
    shrtckn_subj_code       varchar(255)  null,
    shrtckn_crse_numb       varchar(255)  null,
    shrtckn_crse_title      varchar(255)  null,
    shrtckg_credit_hours    int           null,
    shrtckg_hours_attempted int           null,
    shrtckg_grde_code_final varchar(255)  null,
    exclude_subject         varchar(255)  null,
    grade_point             int default 0 null,
    count_gpa_ind           varchar(255)  null,
    inst_name               varchar(255)  null,
    attempted_ind           varchar(255)  null,
    passed_ind              varchar(255)  null,
    completed_ind           varchar(255)  null,
    constraint table_name_id_uindex
        unique (id)
);

create table argo11
(
    id                     int auto_increment
        primary key,
    internal_id            varchar(255) null,
    student_id             varchar(255) null,
    last_name              varchar(255) null,
    first_name             varchar(255) null,
    middle_name            varchar(255) null,
    chinese_name           varchar(255) null,
    hkid                   varchar(255) null,
    student_pay_no         varchar(255) null,
    gender                 varchar(255) null,
    enrol_year_term        varchar(255) null,
    prog_code              varchar(255) null,
    stud_status            varchar(255) null,
    dept_code              varchar(255) null,
    block_code             varchar(255) null,
    programme_title        varchar(255) null,
    campus                 varchar(255) null,
    campus_email           varchar(255) null,
    personal_email         varchar(255) null,
    address                varchar(255) null,
    mobile                 varchar(255) null,
    perm_phone             varchar(255) null,
    cohort                 varchar(255) null,
    cur_enrol_status_code  varchar(255) null,
    current_enrol_status   varchar(255) null,
    last_enrol_term        varchar(255) null,
    last_enrol_term_status varchar(255) null,
    acad_status_code       varchar(255) null,
    acad_status_desc       varchar(255) null,
    award_class            varchar(255) null,
    rate_code              varchar(255) null,
    level                  varchar(255) null,
    grad_term              varchar(255) null,
    passport               varchar(255) null,
    mrid                   varchar(255) null,
    student_comment        varchar(750) null,
    constraint argo11_id_uindex
        unique (id)
);

create table argo16
(
    id          int auto_increment
        primary key,
    term        varchar(255)  null,
    pidm        varchar(255)  null,
    stud_id     varchar(255)  null,
    last_name   varchar(255)  null,
    first_name  varchar(255)  null,
    faculty     varchar(255)  null,
    programme   varchar(255)  null,
    level       varchar(255)  null,
    attemp_hr   int           null,
    earn_hr     int           null,
    pass_hr     int           null,
    gpa_hr      int           null,
    qual_pts    decimal(5, 1) null,
    sgpa        decimal(5, 4) null,
    cgpa        decimal(5, 4) null,
    stud_status varchar(255)  null,
    constraint argo16_id_uindex
        unique (id)
);

create table argo29
(
    id                int auto_increment
        primary key,
    spriden_id        varchar(255) null,
    shrttrm_pidm      varchar(255) null,
    shrttrm_term_code varchar(255) null,
    stvastd_desc      varchar(255) null,
    constraint argo29_id_uindex
        unique (id)
);

create table cge
(
    id     int auto_increment
        primary key,
    code   varchar(255) null,
    title  varchar(255) null,
    domain varchar(255) null,
    lvl    int          null,
    constraint cge_id_uindex
        unique (id)
);

create table program_plan
(
    id      int auto_increment
        primary key,
    course  varchar(255) null,
    credit  int          null,
    program varchar(255) null,
    type    varchar(255) null,
    constraint program_plan_id_uindex
        unique (id)
);

create table exam_document
(
    id                      int auto_increment
        primary key,
    course_code             varchar(255) null,
    course_name             varchar(255) null,
    course_title            varchar(255) null,
    start_date_time         varchar(255) null,
    end_date_time           varchar(255) null,
    remarks                 varchar(255) null,
    loc_host_key            varchar(255) null,
    venue                   varchar(255) null,
    loc_name                varchar(255) null,
    zone_name               varchar(255) null,
    zone_description        varchar(255) null,
    seat_no                 int          null,
    student_host_key        varchar(255) null,
    stu_display_name        varchar(255) null,
    exam_period_name        varchar(255) null,
    exam_period_description varchar(255) null,
    constraint exam_document_id_uindex
        unique (id)
);

create table exam_material
(
    id                        int auto_increment
        primary key,
    course                    varchar(255) null,
    answer_booklet            varchar(255) null,
    supp_sheets               varchar(255) null,
    mc_answer_sheet           varchar(255) null,
    graph_paper               varchar(255) null,
    a4_blank_paper            varchar(255) null,
    other_specified_materials varchar(255) null,
    open_book_exam            varchar(255) null,
    approved_calculators      varchar(255) null,
    approved_notes            varchar(255) null,
    others                    varchar(255) null,
    constraint exam_material_id_uindex
        unique (id)
);

create table exam_sen
(
    id                        int auto_increment
        primary key,
    student_id                varchar(255)  null,
    student_name              varchar(255)  null,
    programme                 varchar(255)  null,
    home_faculty              varchar(255)  null,
    reason                    varchar(255)  null,
    extra_time                varchar(255)  null,
    break_laps                int           null,
    no_breaks_in_2hr          int           null,
    no_breaks_in_3hr          int           null,
    separate_venue            varchar(255)  null,
    permission_use_computer   varchar(255)  null,
    other_special_arrangement varchar(2000) null,
    constraint exam_sen_id_uindex
        unique (id)
);

