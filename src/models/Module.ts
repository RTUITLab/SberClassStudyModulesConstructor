import { Task } from './Task';

export class Module {
    private static nums: number = 0;
    constructor(obj: any) {
        this.id = Module.nums;
        Module.nums++;
        this.visibilitylevel = obj?.visibilitylevel;
        this.moduleСoverImage = obj?.moduleСoverImage;
        this.moduleName = obj?.moduleName;
        this.smallPictureForTheList = obj?.smallPictureForTheList;
        this.tags = obj?.tags;
        this.subject = obj?.subject;
        this.class = obj?.class;
        this.additionalModule = obj?.additionalModule;
        this.laborIntensity = obj?.laborIntensity;
        this.basicIdea = obj?.basicIdea;
        this.problematicQuestion = obj?.problematicQuestion;
        this.instructionsForTheTeacher = obj?.instructionsForTheTeacher;
        this.moduleСover = obj?.moduleСover;
        this.generalConceptOfTheModule = obj?.generalConceptOfTheModule;
        this.typicalDistributionOfAssignmentsByLessons = obj?.typicalDistributionOfAssignmentsByLessons;
        this.possibleDifficultiesMisconceptionsAndWaysToOvercomeThem = obj?.possibleDifficultiesMisconceptionsAndWaysToOvercomeThem;
        this.elOfGoal2 = {
            anExampleOfAchievingAGoal: obj?.elOfGoal2?.anExampleOfAchievingAGoal,
            goalElementDescription: obj?.elOfGoal2?.goalElementDescription,
            tasks: []
        };
        this.elOfGoal3 = {
            anExampleOfAchievingAGoal: obj?.elOfGoal3?.anExampleOfAchievingAGoal,
            goalElementDescription: obj?.elOfGoal3?.goalElementDescription,
            tasks: []
        };
        this.elOfGoal4 = {
            anExampleOfAchievingAGoal: obj?.elOfGoal4?.anExampleOfAchievingAGoal,
            goalElementDescription: obj?.elOfGoal4?.goalElementDescription,
            tasks: []
        };
    }
    id: number;
    visibilitylevel: string;
    moduleСoverImage: string;
    moduleName: string;
    smallPictureForTheList: string;
    tags: string;
    subject: string;
    class: string;
    additionalModule: string;
    laborIntensity: string;
    basicIdea: string;
    problematicQuestion: string;
    instructionsForTheTeacher: string;
    moduleСover: string;
    generalConceptOfTheModule: string;
    typicalDistributionOfAssignmentsByLessons: string;
    possibleDifficultiesMisconceptionsAndWaysToOvercomeThem: string;
    elOfGoal2: {
        goalElementDescription: string;
        anExampleOfAchievingAGoal: string;
        tasks: Task[]
    };
    elOfGoal3: {
        goalElementDescription: string;
        anExampleOfAchievingAGoal: string;
        tasks: Task[]
    };
    elOfGoal4: {
        goalElementDescription: string;
        anExampleOfAchievingAGoal: string;
        tasks: Task[]
    };
}